from abc import ABCMeta, abstractmethod

class AbstractTaste(metaclass=ABCMeta):

    def __init__(self):
        pass

    @abstractmethod
    def getSearchTerms(self):
        pass