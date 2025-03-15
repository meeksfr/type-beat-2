from abc import ABCMeta, abstractmethod

class AbstractTaste(metaclass=ABCMeta):
    '''
    abstract class for pulling search terms (to be used as queries for beat finding) based on user taste
    '''

    def __init__(self):
        pass

    @abstractmethod
    def authorize(self):
        '''
        for authorizing external APIs to access user data
        returns status, token, expires_in if successful, otherwise returns 401
        '''
        pass
    
    @abstractmethod
    def getTasteSource(self):
        '''
        for getting the taste source (e.g. a spotify playlist)
        returns status, data if successful, otherwise returns 401
        '''
        pass


    @abstractmethod
    def getSearchTerms(self):
        '''
        for getting the specific search terms (i.e. artist names) from the taste source
        returns status, data if successful, otherwise returns 401
        '''
        pass

    
