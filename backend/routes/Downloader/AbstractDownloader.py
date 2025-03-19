from abc import ABC, abstractmethod

class AbstractDownloader(ABC):
    '''
    abstract class for downloading a beat from a url
    '''

    def __init__(self):
        pass

    @abstractmethod
    def download(self, url: str):
        '''
        for downloading a beat from a url
        '''
        pass

