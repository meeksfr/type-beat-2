from abc import ABCMeta, abstractmethod

class AbstractBeatFinder(metaclass=ABCMeta):
    '''
    abstract class for finding beats from a list of queries
    '''

    def __init__(self):
        pass
    
    @abstractmethod
    def search(self, queries: list[str]) -> list[str]:
        '''
        for searching for beats from a list of queries
        returns a list of beat urls
        '''
        pass
