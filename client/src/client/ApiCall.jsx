import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

//APOD API call
export const fetchApodData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/apod`);
    return response.data;
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    return null;
  }
};

//Asteroids API call
export const fetchAsteroidsData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/asteroids`);
    return response.data;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    return null;
  }
};

// Fetch Earth Polychromatic Image
export const fetchEarthPolychromaticData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/epic`);
    return response.data;
  } catch (error) {
    console.error("EPIC API error:", error);
    return null;
  }
};

//Fetch Mars Rover List
export const fetchRovers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/rovers`);
    return response.data; // array of rovers
  } catch (error) {
    console.error("Error fetching rover list:", error);
    return [];
  }
};

// Fetch Mars Photos by rover name & date
export const fetchPhotos = async (rover_name, earth_date) => {
  try {
    const response = await axios.get(`${apiUrl}/api/photos`, {
      params: { rover_name, earth_date },
    });
    return response.data; // array of photos
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

// Fetch NASA Hot News
export const fetchNASAnews = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch NASA news:", err);
    return null;
  }
};

