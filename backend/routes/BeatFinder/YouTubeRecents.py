from .AbstractBeatFinder import AbstractBeatFinder
from youtubesearchpython import *

class YouTubeRecents(AbstractBeatFinder):
    '''
    class for searching types of beats from YouTube recently uploaded videos
    '''

    def __init__(self, baseQuery: str = 'intitle:"{x}" type beat'):
        self.baseQuery = baseQuery
        self.links = []

    def search(self, queries: list[str], limit: int = 2) -> list[str]:
        '''
        searches YouTube with a list of queries and returns a list of links to the videos
        '''
        allLinks = set()

        try:
            for q in queries:
                fullQuery = self.baseQuery.replace("{x}", q)
                status, res = self.singleSearch(fullQuery, limit)
                if status == 200:
                    allLinks.update(res)

            self.links = list(allLinks)
            return 200, self.links
        except Exception as e:
            return 400, []

    def singleSearch(self, query: str, limit: int) -> list[str]:
        '''
        searches YouTube for a query and returns a list of links to the videos
        '''
        links = []

        try:
            customSearch = CustomSearch(query, VideoSortOrder.uploadDate, limit=limit)
            for video in customSearch.result()['result']:
                links.append(video['link'])

            return 200, links
        except Exception as e:
            return 400, []

    def getBeatInfo(self, link: str) -> dict:
        '''
        gets the video info from a YouTube link
        '''
        try:
            videoInfo = Video.getInfo(link, mode = ResultMode.json)
            return 200, videoInfo
        except Exception as e:
            return 400, {}

