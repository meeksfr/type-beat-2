import axios from "axios";

const API_BASE_URL = "/api";


export const fetchPlaylists = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/test`);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching playlists", error, query);
    return []; // Return empty array in case of error
  }
};

/*  
export const fetchPlaylists = async (query: string) => {
    console.log("Search Query:", query); // Log the input
  };
*/