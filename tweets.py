from dotenv import load_dotenv
import tweepy
from os import getenv
import requests

# import oauthlib.oauth1
from requests_oauthlib import OAuth1

load_dotenv()

# OAuth 1.0 configuration
# CONSUMER_KEY = getenv("CONSUMER_KEY")
# CONSUMER_SECRET = getenv("CONSUMER_SECRET")
# ACCESS_TOKEN = getenv("ACCESS_TOKEN")
# ACCESS_SECRET = getenv("ACCESS_SECRET")
# CONSUMER_KEY = "CK0DdMJKmz5OYWC29pcasv9Nb"
# CONSUMER_SECRET = "xjJD4PawKhIcTUwFqYtksX9GjfkmHMWw1g82BKGLpGJNZs0bFG"
# ACCESS_TOKEN = "805635117884575744-dREgOUVmuTLnRWFM4PSNwzRKdLEm0Gq"
# ACCESS_SECRET = "YVtBsqmSR8OBMA74zNQ3jZEqsnjwNb13gI3Ff9D28H2zB"

CONSUMER_KEY = "CK0DdMJKmz5OYWC29pcasv9Nb"
CONSUMER_SECRET = "xjJD4PawKhIcTUwFqYtksX9GjfkmHMWw1g82BKGLpGJNZs0bFG"
ACCESS_TOKEN = "805635117884575744-dREgOUVmuTLnRWFM4PSNwzRKdLEm0Gq"
ACCESS_SECRET = "YVtBsqmSR8OBMA74zNQ3jZEqsnjwNb13gI3Ff9D28H2zB"


class TweepyClient:

    async def get_tweets(self, id):

        base_url = "https://api.twitter.com/2/users/805635117884575744/timelines/reverse_chronological?exclude=retweets,replies&expansions=attachments.media_keys,author_id&media.fields=preview_image_url,url&user.fields=name,username,profile_image_url&tweet.fields=attachments"

        oauth = OAuth1(
            client_key=CONSUMER_KEY,
            client_secret=CONSUMER_SECRET,
            resource_owner_key=ACCESS_TOKEN,
            resource_owner_secret=ACCESS_SECRET,
        )

        response = requests.get(base_url, auth=oauth)

        return response.json()
