from backend.routes.BeatAnalyzer.YouTubeDescriptionAnalyzer import YouTubeDescriptionAnalyzer

#TODO: build out tests

def test_bpm():
    analyzer = YouTubeDescriptionAnalyzer()
    assert analyzer.bpm("120 BPM") == (200, 120)
    assert analyzer.bpm("120bpm") == (200, 120)
    assert analyzer.bpm("bpm: 120") == (200, 120)
    assert analyzer.bpm("bpm 120") == (200, 120)
    