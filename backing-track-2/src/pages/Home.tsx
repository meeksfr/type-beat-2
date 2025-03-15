import SearchBar from "../components/SearchBar";
import { fetchSources, fetchArtistsFromPlaylist } from "../services/api";
import { useState, useEffect } from "react";
import PlaylistList from "../components/PlaylistList";
import ArtistChipContainer from "../components/ArtistChipContainer";

const Home = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [artists, setArtists] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

    const handleSearch = async (query: string) => {
        if (query.length > 0) {
            const response = await fetchSources(query);
            setPlaylists(response);
            setArtists([]);
            setSelectedArtists([]);
        } else {
            setArtists([]);
            setSelectedArtists([]);
            setPlaylists([]);
        }
    }

    const handlePlaylistClick = async (playlist: any) => {
        setSelectedPlaylist(playlist);
        setPlaylists([]);
        const response = await fetchArtistsFromPlaylist(playlist.id);
        setArtists(response);
        // Initialize all artists as selected
        setSelectedArtists(response);
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

    return (
        <div>
            <h3>backing track --- a type beat downloader</h3>
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
        </div>
    )
}

export default Home;
