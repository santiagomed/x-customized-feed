import xai_sdk
import asyncio
import regex as re
import aiohttp
import os
from groq import Groq as GroqClient
from pydantic import BaseModel
from typing import List, Optional
from prompt import preamble_with_img, preamble_without_img
from moondream import Moondream


class Image(BaseModel):
    url: str
    width: Optional[int] = None
    height: Optional[int] = None


class Tweet(BaseModel):
    id: str
    text: str
    img: Optional[List[Image]] = None


class ClassifyRequest(BaseModel):
    system_prompt: str
    algorithm: str
    data: List[Tweet]


class Grok:
    def __init__(self):
        self.client = xai_sdk.Client()

    async def send_message(self, message: str):
        response = ""
        async for token in self.client.sampler.sample(
            message, max_len=3, temperature=0.1
        ):
            response += token.token_str
        return response


class Groq:
    def __init__(self):
        self.client = GroqClient(api_key=os.environ.get("GROQ_API_KEY"))

    async def send_message(self, message: str):
        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": message,
                }
            ],
            model="mixtral-8x7b-32768",
        )

        return chat_completion.choices[0].message.content


class TweetObj(BaseModel):
    text: str
    img_description: str


async def open_image_from_url(url):
    """
    Asynchronously open an image from a URL.
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            response.raise_for_status()
            return await response.read()


class Classifier:
    def __init__(self):
        self.moondream = Moondream()
        self.grok = Grok()

    async def classify(self, request: ClassifyRequest):
        tasks = [
            self.classify_tweet(request.system_prompt, tweet) for tweet in request.data
        ]
        responses: List[str] = await asyncio.gather(*tasks)
        # remove any punctuation and extra whitespace as well as convert to lowercase
        responses = [response.strip().lower() for response in responses]
        print(responses)

        if request.algorithm == "clean":
            return [
                tweet.id
                for tweet, response in zip(request.data, responses)
                if "yes" in response
            ]
        elif request.algorithm == "prioritize":
            sorted_responses = sorted(
                zip(request.data, responses), key=lambda x: "no" in x[1]
            )
            return [tweet.id for tweet, _ in sorted_responses]

    async def classify_tweet(self, system_prompt: str, tweet: Tweet):
        text = tweet.text
        input = None
        if tweet.img:
            image = await open_image_from_url(tweet.img[0].url)
            # Run Moondream.generate in a separate thread to prevent blocking
            img_description = await asyncio.to_thread(
                self.moondream.generate, "Briefly describe this image.", image
            )
            print(img_description)
            tweet_obj = TweetObj(text=text, img_description=img_description)
            input = preamble_with_img.format(
                prompt=system_prompt,
                text=tweet_obj.text,
                img_description=tweet_obj.img_description,
            )
            print("Tweet:", input)
        else:
            input = preamble_without_img.format(prompt=system_prompt, text=text)
            print("Tweet:", input)

        response = await self.grok.send_message(input)
        print("Response:", response)
        return response
