import pytest
from backend.routes.BeatAnalyzer.YouTubeDescriptionAnalyzer import YouTubeDescriptionAnalyzer

@pytest.fixture(scope="module")
def analyzer():
    return YouTubeDescriptionAnalyzer()

test_data = [
    ("120 BPM / C Major", 120, "C", "Major"),
    ("120bpm / C+", 120, "C", "Major"),
    ("bpm: 90 / C-", 90, "C", "Minor"),
    ("bpm 90 / C min", 90, "C", "Minor"),
    ("90 BPM / Cmaj", 90, "C", "Major"),
]

@pytest.mark.parametrize("description, expected_bpm, expected_key, expected_modality", test_data)
def test_bpm(analyzer, description, expected_bpm, expected_key, expected_modality):
    assert analyzer.bpm(description) == (200, expected_bpm)

@pytest.mark.parametrize("description, expected_bpm, expected_key, expected_modality", test_data)
def test_key(analyzer, description, expected_bpm, expected_key, expected_modality):
    assert analyzer.key(description) == (200, expected_key, expected_modality)
    