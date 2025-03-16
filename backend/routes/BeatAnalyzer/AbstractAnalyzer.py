from abc import ABC, abstractmethod

class AbstractAnalyzer(ABC):
    '''
    abstract class for pulling metrics (BPM, key, etc.) from a beat
    '''

    def __init__(self):
        pass

    @abstractmethod
    def bpm(self) -> tuple[int, int]:
        '''
        returns BPM of the beat as a tuple of (status, bpm)
        '''
        pass

    @abstractmethod
    def key(self) -> tuple[int, str, str]:
        '''
        returns the key of the beat as a tuple of (status, note, modality)
        '''
        pass


