from .AbstractTaste import AbstractTaste
from dotenv import load_dotenv
import os
import base64
import requests
import time
class SpotifyTaste(AbstractTaste):

    def __init__(self):
        #declare spotify client id and secret in .env file
        load_dotenv("../../.env")
        self.SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
        self.SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
        self.encoded_credentials = base64.b64encode(f"{self.SPOTIFY_CLIENT_ID}:{self.SPOTIFY_CLIENT_SECRET}".encode()).decode()
        self.token = None
        self.expiration_time = None
        self.expiration_buffer = 60
    
    def authorize(self) -> tuple[int, str, int]:
        '''
        implements "client credentials flow" authorization, 
        since spotify limits the number of users that can be authorized with a traditional sign in flow.
        this means that we can only access endpoints that do not require user authentication
        
        returns status, token, expires_in if successful, otherwise returns 401
        '''
        current_time = time.time()
        if self.token is None or current_time + self.expiration_buffer > self.expiration_time:
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
                self.token = token
                self.expiration_time = current_time + expires_in
                return 200, token, expires_in
            else:
                return 401, None, None
        else:
            return 200, self.token, self.expiration_time - current_time
    
    def getTasteSource(self, q: str, qType: str = "playlist", market: str = "CA", limit: int = 10) -> tuple[int, list[str]]:
        '''
        searches for a taste source (e.g. a spotify playlist) based on a query
        returns status, data
        '''
        if self.token is None:
            return 403, "Unauthorized"
        
        url = "https://api.spotify.com/v1/search"
        headers = {
            "Authorization": "Bearer " + self.token
        }
        params = {
            "q": q,
            "type": qType,
            "limit": limit,
            "market": market
        }
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            return 200, response.json()["playlists"]["items"]
        else:
            return 401, []

    def getSearchTerms(self, playlist_id: str, limit: int = 12):
        '''
        gets the search terms (i.e. artist names) from a taste source
        returns status, data
        '''
        if self.token is None:
            return 403, "Unauthorized"
        
        url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
        headers = {
            "Authorization": "Bearer " + self.token
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:

            #TODO: add other methods of collecting artists (e.g. most appearances, most popular, etc.)
            searchTerms = set()
            for item in response.json()["items"]:
                for artist in item["track"]["artists"]:
                    searchTerms.add(artist["name"])
                if len(searchTerms) >= limit:
                    break
            return 200, list(searchTerms)[:limit]
        else:
            return 401, []
