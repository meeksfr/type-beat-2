import axios from "axios";

const API_BASE_URL = "/api";

/*
export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
}*/

export const fetchSources = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/taste/source?q=${query}`);
    return response.data.data;
    
  } catch (error) {
    console.error("Error fetching sources", error, query);
    return [];
  }
};

export const fetchArtistsFromPlaylist = async (playlistId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/taste/searchTerms?playlist_id=${playlistId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error pulling artists from playlist", error, playlistId);
        return [];
    }
}

export const fetchBeats = async (searchTerms: string[]) => {
    try {
        const body = {
            searchTerms: searchTerms
        }
        const response = await axios.post(`${API_BASE_URL}/finder/search`, body);
        return response.data;
    } catch (error) {
        console.error("Error fetching beats", error, searchTerms);
        return [];
    }
}

