import axios from "axios";
import { Beat } from "../types/interfaces";

const API_BASE_URL = "/api";

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

export const fetchBeatInfo = async (url: string): Promise<Beat | null> => {
    try {
        const infoResponse = await axios.get(`${API_BASE_URL}/finder/beatInfo?link=${url}`);
        const videoInfo = infoResponse.data;
    
        const analysisResponse = await axios.post(`${API_BASE_URL}/analyzer/analyze`, {
            description: videoInfo.description
        });
        const analysis = analysisResponse.data;
        const beat: Beat = {
            url: url,
            id: videoInfo.id,
            title: videoInfo.title,
            thumbnailUrl: videoInfo.thumbnails[0].url,
            bpm: analysis.bpm,
            keyCenter: analysis.key,
            modality: analysis.modality
        }
        return beat;
    } catch (error) {
        console.error("Error fetching beat info", error, url);
        return null;
    }
}

export const downloadBeat = async (beat: Beat) => {
    try {
        const url = beat.url;
        const key = `${beat.keyCenter}_${beat.modality}` || "";
        const bpm = beat.bpm || "";
        const title = beat.title || "";

        const response = await axios.get(`${API_BASE_URL}/downloader/downloadWithInfo?url=${url}&key=${key}&bpm=${bpm}&title=${title}`, {
            responseType: 'blob'
        });
        
        // Create a blob URL from the response data
        const blob = new Blob([response.data], { type: 'audio/mp3' });
        const blobUrl = window.URL.createObjectURL(blob);
        return blobUrl;
    } catch (error) {
        console.error("Error downloading beat", error);
        return null;
    }
}