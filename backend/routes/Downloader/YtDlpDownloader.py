from .AbstractDownloader import AbstractDownloader
from yt_dlp import YoutubeDL
import static_ffmpeg
import os
import tempfile
import shutil

class YtDlpDownloader(AbstractDownloader):
    '''
    for downloading a beat from a youtube url via yt-dlp
    '''

    def __init__(self):
        self.temp_dir = os.path.join(tempfile.gettempdir(), "backing_track")
        os.makedirs(self.temp_dir, exist_ok=True) 
        static_ffmpeg.add_paths()
    
    def download(self, url: str, beatInfo: dict | None = None) -> tuple[int, str]:
        '''
        for downloading a beat from a youtube url and saving it with the key and bpm
        returns status, path to the downloaded file
        '''
        
        if beatInfo is None:
            file_name = "audio"
        else:
            key = beatInfo["key"]
            bpm = beatInfo["bpm"]
            title = beatInfo["title"]
            file_name = f"{key}_{bpm}_{title}"

        output_path = os.path.join(self.temp_dir, f"{file_name}.mp3")

        # Check if file already exists
        if os.path.exists(output_path):
            return 200, output_path

        # Download and convert using yt-dlp
        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": os.path.join(self.temp_dir, f"{file_name}.%(ext)s"),
            "postprocessors": [
                {"key": "FFmpegExtractAudio", "preferredcodec": "mp3", "preferredquality": "192"},
            ],
        }

        try:
            with YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            return 200, output_path
        
        except Exception as e:
            return 400, None

    
    def cleanUp(self, maxFiles: int = 2) -> int:
        '''
        for cleaning up the temporary files
        '''
        try:
            files = [f for f in os.listdir(self.temp_dir) if os.path.isfile(os.path.join(self.temp_dir, f))]
            files.sort(key=lambda x: os.path.getmtime(os.path.join(self.temp_dir, x)))

            # Delete only if there are more than `maxFiles`
            num_to_delete = max(0, len(files) - maxFiles)
            for file in files[:num_to_delete]:
                os.remove(os.path.join(self.temp_dir, file))
            return 204
        
        except Exception as e:
            return 400
