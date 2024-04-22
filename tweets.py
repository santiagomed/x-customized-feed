import requests
import os
from requests_oauthlib import OAuth1


class TweepyClient:

    def get_tweets(self):

        base_url = "https://api.twitter.com/2/users/805635117884575744/timelines/reverse_chronological?exclude=retweets,replies&expansions=attachments.media_keys,author_id&media.fields=preview_image_url,url&user.fields=name,username,profile_image_url&tweet.fields=attachments,created_at,public_metrics&max_results=12"

        oauth = OAuth1(
            client_key=os.getenv("CONSUMER_KEY"),
            client_secret=os.getenv("CONSUMER_SECRET"),
            resource_owner_key=os.getenv("ACCESS_TOKEN"),
            resource_owner_secret=os.getenv("ACCESS_SECRET"),
        )

        headers = {"X-B3-Flags": "1"}

        response = requests.get(base_url, auth=oauth, headers=headers)

        return response.json()
