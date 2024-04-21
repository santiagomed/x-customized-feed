use pyo3::prelude::*;
pub mod logits_processor;
pub mod pipeline;

#[pyclass]
#[pyo3(name = "Moondream")]
struct Pipeline {
    pipeline: pipeline::Pipeline,
}

#[pymethods]
impl Pipeline {
    #[new]
    fn new() -> PyResult<Self> {
        let device = candle::Device::new_metal(0).map_err(|e| {
            PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(format!("Error: {}", e))
        })?;
        let pipeline = pipeline::Pipeline::new(&device).map_err(|e| {
            PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(format!("Error: {}", e))
        })?;
        Ok(Self { pipeline })
    }

    fn generate(&self, prompt: &str, img: Vec<u8>) -> PyResult<String> {
        let mut pipeline = self.pipeline.clone();
        pipeline.set_tokens(prompt).map_err(|e| {
            PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(format!("Error: {}", e))
        })?;
        pipeline.set_image_embeds(img).map_err(|e| {
            PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(format!("Error: {}", e))
        })?;
        for generation in pipeline.iter() {
            let generation = generation.map_err(|e| {
                PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(format!("Error: {}", e))
            })?;
            if generation.generated_text.is_some() {
                return Ok(generation.generated_text.unwrap());
            }
        }
        Err(PyErr::new::<pyo3::exceptions::PyRuntimeError, _>(
            "This code should be unreachable".to_string(),
        ))
    }
}

/// A Python module implemented in Rust.
#[pymodule]
fn moondream(_py: Python, m: &PyModule) -> PyResult<()> {
    pyo3_log::init();
    m.add_class::<Pipeline>()?;
    Ok(())
}
