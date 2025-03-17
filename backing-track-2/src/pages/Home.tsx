import SearchBar from "../components/SearchBar";
import { fetchSources, fetchArtistsFromPlaylist, fetchBeats, fetchBeatInfo } from "../services/api";
import { useState, useEffect } from "react";
import PlaylistList from "../components/PlaylistList";
import ArtistChipContainer from "../components/ArtistChipContainer";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import BeatStack from "../components/BeatStack";
import { Beat } from "../types/interfaces";

const Home = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [artists, setArtists] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [beats, setBeats] = useState<Beat[]>([]);
    const [loadingBeats, setLoadingBeats] = useState<string[]>([]);

    const handleSearch = async (query: string) => {
        if (query.length > 0) {
            const response = await fetchSources(query);
            setPlaylists(response);
        } else {
            setPlaylists([]);
        }
        setArtists([]);
        setSelectedArtists([]);
        setBeats([]);
        setLoadingBeats([]);
    }

    const handlePlaylistClick = async (playlist: any) => {
        setSelectedPlaylist(playlist);
        setPlaylists([]);
        const response = await fetchArtistsFromPlaylist(playlist.id);
        setArtists(response);
        setSelectedArtists(response); // Initialize all artists as selected
        setBeats([]);
        setLoadingBeats([]);
    }

    const handleArtistClick = (artist: string) => {
        setSelectedArtists(prev => {
            if (prev.includes(artist)) {
                // Remove artist if already selected
                return prev.filter(a => a !== artist);
            } else {
                // Add artist if not selected
                return [...prev, artist];
            }
        });
    }

    const handleBeatFetch = async () => {
        setIsLoading(true);
        try {
            const urls = await fetchBeats(selectedArtists);
            //initialize beats with just urls and empty fields
            const beats: Beat[] = urls.map((url: string) => ({
                url,
                title: '',
                bpm: undefined,
                keyCenter: undefined,
                modality: undefined,
                thumbnailUrl: undefined
            }));
            setBeats(beats);
            setLoadingBeats(urls);

            // Fetch info for each beat
            for (const url of urls) {
                try {
                    const beatInfo = await fetchBeatInfo(url);
                    if (beatInfo) {
                        setBeats(prev => prev.map(beat => 
                            beat.url === url ? beatInfo : beat
                        ));
                    }
                } finally {
                    setLoadingBeats(prev => prev.filter(u => u !== url));
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h3>backing track --- a type beat mp3 downloader</h3>
            <SearchBar onSearch={handleSearch} />
            {playlists.length > 0 && (
                <PlaylistList playlists={playlists} onPlaylistClick={handlePlaylistClick} />
            )}
            {artists.length > 0 && (
                <ArtistChipContainer 
                    artists={artists} 
                    selectedArtists={selectedArtists}
                    onArtistClick={handleArtistClick}
                />
            )}
            {selectedArtists.length > 0 && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleBeatFetch}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size="1.5rem" color="inherit" />
                    ) : (
                        "Fetch Type Beats"
                    )}
                </Button>
            )}
            {beats.length > 0 && (
                <BeatStack 
                    beats={beats}
                    loadingBeats={loadingBeats}
                />
            )}
        </div>
    )
}

export default Home;
