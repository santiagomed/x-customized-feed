import logging
from fastapi import FastAPI, Response
from classifier import Classifier, Tweet, ClassifyRequest
from tweets import TweepyClient
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv


load_dotenv()

FORMAT = "%(levelname)s %(name)s %(asctime)-15s %(filename)s:%(lineno)d %(message)s"
logging.basicConfig(format=FORMAT)
logging.getLogger().setLevel(logging.INFO)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {
        "endpoints": [
            {
                "route": "/",
                "method": "POST",
                "description": "Classify tweets based on the system prompt and algorithm.",
            },
            {
                "route": "/tweets",
                "method": "GET",
                "description": "Fetches user tweets.",
            },
        ]
    }


@app.post("/")
async def classify_tweets(req: ClassifyRequest, response: Response):
    try:
        print("Received request:", req)
        classifier = Classifier()
        return await classifier.classify(req)

    except Exception as e:
        print("Error processing request:", e)
        response.status_code = 500
        return {"error": str(e)}


@app.get("/get_tweets")
async def get_tweets(id: int, response: Response):
    try:
        print("Received request")
        # call twitter api to get timeline for user
        tweetsClient = TweepyClient()
        res = await tweetsClient.get_tweets(id)
        print(res)
        return res

    except Exception as e:
        print("Error processing request:", e)
        response.status_code = 500
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
