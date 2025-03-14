from .AbstractTaste import AbstractTaste
from dotenv import load_dotenv
import os
import base64
import requests

class SpotifyTaste(AbstractTaste):

    def __init__(self):
        #declare spotify client id and secret in .env file
        load_dotenv("../../.env")
        self.SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
        self.SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
        self.encoded_credentials = base64.b64encode(f"{self.SPOTIFY_CLIENT_ID}:{self.SPOTIFY_CLIENT_SECRET}".encode()).decode()
    
    def authorize(self):
        '''
        implements "client credentials flow" authorization, since spotify limits the number of users that can be authorized
        this means that we can only access endpoints that do not require user authentication
        
        returns status, token, expires_in if successful, otherwise returns 401
        '''

        url = "https://accounts.spotify.com/api/token"
        headers = {
            "Authorization": "Basic " + self.encoded_credentials
        }
        data = {
            "grant_type": "client_credentials"
        }
        response = requests.post(url, headers=headers, data=data)

        if (response.status_code == 200):
            token = response.json()["access_token"]
            expires_in = response.json()["expires_in"]
            return 200, token, expires_in
        else:
            return 401, None, None
    
    def getSearchTerms(self):
        '''
        '''
        return None
