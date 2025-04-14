import pytest
from backend.routes.BeatFinder.YouTubeRecents import YouTubeRecents
from youtubesearchpython import *

@pytest.fixture(scope="module")
def searcher():
    return YouTubeRecents()

def test_getBeatInfo(mocker, searcher):
    getInfo = mocker.patch('backend.routes.BeatFinder.YouTubeRecents.Video.getInfo', return_value={"info": "test"})
    assert searcher.getBeatInfo("video-link") == (200, {"info": "test"})
    getInfo.assert_called_once_with("video-link", mode = ResultMode.json)
    
def test_singleSearch(mocker, searcher):
    mock_custom_search = mocker.MagicMock()
    mock_custom_search.result.return_value = {"result": [{"link": "video-link"}]}
    mocker.patch('backend.routes.BeatFinder.YouTubeRecents.CustomSearch', return_value=mock_custom_search)
    assert searcher.singleSearch("search-query", limit=2) == (200, ["video-link"])
    mock_custom_search.result.assert_called_once()

def test_search(mocker, searcher):
    singleSearch = mocker.patch('backend.routes.BeatFinder.YouTubeRecents.YouTubeRecents.singleSearch', return_value=(200, ["video-link"]))
    assert searcher.search(["search-query", "search-query2"], limit=2) == (200, ["video-link"]) #same video link twice should only be returned once
    singleSearch.assert_has_calls([
        mocker.call(searcher.baseQuery.replace("{x}", "search-query"), 2),
        mocker.call(searcher.baseQuery.replace("{x}", "search-query2"), 2)
    ], any_order=True)
