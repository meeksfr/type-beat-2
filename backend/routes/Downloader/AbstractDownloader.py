from abc import ABC, abstractmethod

class AbstractDownloader(ABC):
    '''
    abstract class for downloading a beat from a url
    '''

    def __init__(self):
        pass

    @abstractmethod
    def download(self, url: str) -> tuple[int, str]:
        '''
        for downloading a beat from a url
        returns status, path to the downloaded file
        '''
        pass

    @abstractmethod
    def cleanUp(self) -> int:
        '''
        for cleaning up the temporary files
        returns status
        '''
        pass
