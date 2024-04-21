import xai_sdk
import asyncio
import requests
from pydantic import BaseModel
from typing import List, Optional
from prompt import prompt, prompt_with_image
from moondream import Moondream
import regex as re


class Image(BaseModel):
    url: str
    width: Optional[int] = None
    height: Optional[int] = None


class Tweet(BaseModel):
    id: int
    author_id: int
    text: str
    img: Optional[List[Image]] = None


class ClassifyRequest(BaseModel):
    system_prompt: str
    algorithm: str
    data: List[Tweet]


class Grok:
    def __init__(self, fun_mode=False):
        self.client = xai_sdk.Client()
        self.fun_mode = fun_mode

    async def send_message(self, message):
        conversation = self.client.chat.create_conversation(fun_mode=self.fun_mode)
        if not message:
            return "No input provided."

        response = await conversation.add_response_no_stream(message)
        return response.message


class TweetObj(BaseModel):
    text: str
    img_description: str


def open_image_from_url(url):
    """
    Open an image from a URL.
    """
    response = requests.get(url)
    response.raise_for_status()
    image = response.content
    return image


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
        responses = [
            re.sub(r"[^\w\s]", "", response).strip().lower() for response in responses
        ]
        print(responses)

        if request.algorithm == "clean":
            return [
                tweet.id
                for tweet, response in zip(request.data, responses)
                if response == "yes"
            ]
        elif request.algorithm == "prioritize":
            sorted_responses = sorted(
                zip(request.data, responses), key=lambda x: x[1] == "no"
            )
            return [tweet.id for tweet, _ in sorted_responses]

    async def classify_tweet(self, system_prompt: str, tweet: Tweet):
        text = tweet.text
        input = None
        if tweet.img:
            image = open_image_from_url(tweet.img[0].url)
            img_description = self.moondream.generate("Describe this image.", image)
            print(img_description)
            tweet_obj = TweetObj(text=text, img_description=img_description)
            input = prompt_with_image.format(
                prompt=system_prompt,
                text=tweet_obj.text,
                img_description=tweet_obj.img_description,
            )
            print("Tweet:", input)
        else:
            input = prompt.format(prompt=system_prompt, text=text)
            print("Tweet:", input)

        response = await self.grok.send_message(input)
        return response
