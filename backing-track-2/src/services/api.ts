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
}

export interface Beat {
    url: string;
    title?: string;
    key?: string;
    modality?: string;
    bpm?: number;
    thumbnail?: string;
}
export const fetchBeatInfo = async (url: string): Promise<Beat> => {

*/

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

export const fetchBeatInfo = async (url: string) => {
    try {
        const infoResponse = await axios.get(`${API_BASE_URL}/finder/beatInfo?link=${url}`);
        const videoInfo = infoResponse.data;
    
        const analysisResponse = await axios.post(`${API_BASE_URL}/analyzer/analyze`, {
            description: videoInfo.description
        });
        const analysis = analysisResponse.data;
        return {
            url: url,
            id: videoInfo.id,
            title: videoInfo.title,
            thumbnailUrl: videoInfo.thumbnails[0].url,
            bpm: analysis.bpm,
            keyCenter: analysis.key,
            modality: analysis.modality
        }
    } catch (error) {
        console.error("Error fetching beat info", error, url);
        return null;
    }
}

