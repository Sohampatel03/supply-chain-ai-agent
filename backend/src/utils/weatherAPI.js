import axios from "axios";

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Get current weather by city name
 */
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric", // Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return null;
  }
};

/**
 * Get current weather by latitude & longitude
 */
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return null;
  }
};
