use candle::{DType, Device, Tensor};
use candle_nn::VarBuilder;
use candle_transformers::{
    generation::LogitsProcessor,
    models::moondream::{Config, Model},
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tokenizers::Tokenizer;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),

    #[error(transparent)]
    Json(#[from] serde_json::Error),

    #[error(transparent)]
    Api(#[from] hf_hub::api::sync::ApiError),

    #[error(transparent)]
    Candle(#[from] candle::Error),

    #[error(transparent)]
    Tokenizer(#[from] Box<dyn std::error::Error + Send + Sync>),

    #[error("Model {0} was not found")]
    ModelNotFound(String),

    #[error("Special token {0} was not found")]
    SpecialTokenNotFound(String),

    #[error("Input error {0}")]
    InputError(String),
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Token {
    id: usize,
    text: String,
    special: bool,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Generation {
    token: Token,
    pub generated_text: Option<String>,
    details: Option<bool>,
}

fn build_model_and_tokenizer(device: &Device) -> Result<(Model, Tokenizer), Error> {
    let api = hf_hub::api::sync::Api::new()?;
    let model_id = "vikhyatk/moondream2".to_string();
    let repo = api.repo(hf_hub::Repo::new(model_id, hf_hub::RepoType::Model));
    let model_file = repo.get("model.safetensors")?;
    let tokenizer = repo.get("tokenizer.json")?;
    let tokenizer = Tokenizer::from_file(tokenizer)?;
    let config = Config::v2();

    let vb = unsafe { VarBuilder::from_mmaped_safetensors(&[model_file], DType::F16, device)? };
    let model = Model::new(&config, vb)?;
    Ok((model, tokenizer))
}

fn get_image_embeddings(img: Vec<u8>, device: &Device) -> Result<Tensor, Error> {
    pub fn load_image(img: Vec<u8>) -> candle::Result<Tensor> {
        use std::io::Cursor;
        let img = image::io::Reader::new(Cursor::new(img))
            .with_guessed_format()?
            .decode()
            .map_err(candle::Error::wrap)?
            .resize_to_fill(378, 378, image::imageops::FilterType::Triangle); // Adjusted to 378x378
        let img = img.to_rgb8();
        let data = img.into_raw();
        let data = Tensor::from_vec(data, (378, 378, 3), &Device::Cpu)?.permute((2, 0, 1))?;
        let mean = Tensor::new(&[0.5f32, 0.5, 0.5], &Device::Cpu)?.reshape((3, 1, 1))?;
        let std = Tensor::new(&[0.5f32, 0.5, 0.5], &Device::Cpu)?.reshape((3, 1, 1))?;
        (data.to_dtype(candle::DType::F32)? / 255.)?
            .broadcast_sub(&mean)?
            .broadcast_div(&std)
    }

    let image = load_image(img)?
        .to_dtype(DType::F16)?
        .to_device(device)?
        .unsqueeze(0)?;
    log::info!("Image loaded: {image:?}");
    Ok(image)
}

// pub fn build_pipeline(
//     model: Arc<Mutex<Model>>,
//     tokenizer: Arc<Mutex<Tokenizer>>,
//     device: &Device,
// ) -> Result<Pipeline, Error> {
// let prompt = format!("\n\nQuestion: {}\nAnswer:", prompt.unwrap_or_default());
// let tokens = tokenizer.lock().unwrap().encode(prompt, true)?;
// if tokens.is_empty() {
//     return Err(Error::InputError("Prompt is empty".to_string()));
// }
// let tokens = Some(tokens.get_ids().to_vec());
// let image_embeds = Some(
//     get_image_embeddings(img.unwrap_or_default(), device)?
//         .apply(model.lock().unwrap().vision_encoder())?,
// );
//     Pipeline::new(model, tokenizer, device)
// }

pub struct PipelineIter<'a> {
    pipeline: &'a mut Pipeline,
    tokens: Vec<u32>,
    image_embeds: Tensor,
    generated_tokens: Vec<u32>,
    last: bool,
    i: usize,
}

pub struct Pipeline {
    model: Arc<Mutex<Model>>,
    device: Device,
    tokenizer: Arc<Mutex<Tokenizer>>,
    logits_processor: LogitsProcessor,
    tokens: Option<Vec<u32>>,
    image_embeds: Option<Tensor>,
    special_token: u32,
}

impl Pipeline {
    pub fn new(device: &Device) -> Result<Self, Error> {
        let (model, tokenizer) = build_model_and_tokenizer(&device)?;
        let logits_processor = LogitsProcessor::new(0, None, None);
        // Moondream tokenizer bos_token and eos_token is "<|endoftext|>"
        // https://huggingface.co/vikhyatk/moondream2/blob/main/special_tokens_map.json
        let special_token = match tokenizer.get_vocab(true).get("<|endoftext|>") {
            Some(token) => *token,
            None => {
                return Err(Error::SpecialTokenNotFound(
                    "Special token not found".to_string(),
                ))
            }
        };
        Ok(Self {
            model: Arc::new(Mutex::new(model)),
            tokenizer: Arc::new(Mutex::new(tokenizer)),
            logits_processor,
            device: device.clone(),
            tokens: None,
            image_embeds: None,
            special_token,
        })
    }

    pub fn set_tokens(&mut self, prompt: &str) -> Result<(), Error> {
        let tokens = self.tokenizer.lock().unwrap().encode(prompt, true)?;
        if tokens.is_empty() {
            return Err(Error::InputError("Prompt is empty".to_string()));
        }
        let tokens = tokens.get_ids().to_vec();
        self.tokens = Some(tokens);
        Ok(())
    }

    pub fn set_image_embeds(&mut self, img: Vec<u8>) -> Result<(), Error> {
        self.image_embeds = Some(
            get_image_embeddings(img, &self.device)?
                .apply(self.model.lock().unwrap().vision_encoder())?,
        );
        Ok(())
    }

    pub fn iter(&mut self) -> PipelineIter {
        if self.tokens.is_none() {
            panic!("Tokens are not set");
        }

        if self.image_embeds.is_none() {
            panic!("Image embeddings are not set");
        }
        PipelineIter {
            tokens: self.tokens.as_ref().unwrap().clone(),
            image_embeds: self.image_embeds.as_ref().unwrap().clone(),
            generated_tokens: vec![],
            pipeline: self,
            i: 0,
            last: false,
        }
    }

    pub fn clear_kv_cache(&mut self) {
        self.model.lock().unwrap().text_model.clear_kv_cache();
    }
}

impl<'a> PipelineIter<'a> {
    fn inner_next(&mut self) -> Result<Generation, Error> {
        let special_token = self.pipeline.special_token;
        let input = Tensor::new(self.tokens.as_slice(), &self.pipeline.device)?.unsqueeze(0)?;
        let mut model = self.pipeline.model.lock().unwrap();
        let logits = if self.i > 0 {
            model.text_model.forward(&input)?
        } else {
            log::info!("Running first forward pass with image embeds");
            let bos_token = Tensor::new(&[special_token], &self.pipeline.device)?.unsqueeze(0)?;
            let logits =
                model
                    .text_model
                    .forward_with_img(&bos_token, &input, &self.image_embeds)?;
            logits
        };
        let logits = logits.squeeze(0)?.to_dtype(DType::F16)?;
        let next_token = self.pipeline.logits_processor.sample(&logits)?;
        let text = self
            .pipeline
            .tokenizer
            .lock()
            .unwrap()
            .decode(&[next_token], true)?;
        self.generated_tokens.push(next_token);
        self.tokens = vec![next_token];
        let stop = next_token == special_token;
        let generated_text = if stop {
            Some(
                self.pipeline
                    .tokenizer
                    .lock()
                    .unwrap()
                    .decode(&self.generated_tokens, true)?,
            )
        } else {
            None
        };
        self.i += 1;
        Ok(Generation {
            token: Token {
                id: next_token as usize,
                text,
                special: stop,
            },
            generated_text,
            details: None,
        })
    }
}

impl<'a> Iterator for PipelineIter<'a> {
    type Item = Result<Generation, Error>;

    fn next(&mut self) -> Option<Self::Item> {
        if self.last {
            return None;
        }
        let generation = self.inner_next();
        if let Ok(generation) = &generation {
            if generation.generated_text.is_some() {
                self.last = true;
            }
        }
        Some(generation)
    }
}
