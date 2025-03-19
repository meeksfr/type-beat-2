from .AbstractDownloader import AbstractDownloader
from yt_dlp import YoutubeDL

class YtDlpDownloader(AbstractDownloader):
    '''
    for downloading a beat from a youtube url via yt-dlp
    '''

    def __init__(self):
        super().__init__()

    def download(self, url: str):
        '''
        for downloading a beat from a youtube url
        '''
        pass
