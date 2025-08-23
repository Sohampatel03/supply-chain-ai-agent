import { getWeatherByCity } from "../utils/weatherAPI.js";

/**
 * Calculate delay risk based on weather & supplier location
 */
export const calculateDelayRisk = async (supplier) => {
    console.log(supplier);
  try {
    // ✅ Supplier ka city check karo
    if (!supplier || !supplier.location) {
      return {
        risk: "Unknown",
        reason: "Supplier city not provided",
      };
    }

    // ✅ Weather API call
    const weatherData = await getWeatherByCity(supplier.location);

     // ✅ DEBUG: API response ko log karo
    console.log("Weather data for",weatherData);
    if (!weatherData) {
      return {
        risk: "Unknown",
        reason: "Weather API failed",
      };
    }

    const weatherMain = weatherData.weather[0].main.toLowerCase();

    // ✅ Default: Low risk
    let riskLevel = "Low";
    let reason = `Clear weather: ${weatherMain}`;

    // ✅ Agar kharab mausam hai to risk high
    if (["rain", "storm", "snow", "thunderstorm"].includes(weatherMain)) {
      riskLevel = "High";
      reason = `Bad weather detected: ${weatherMain}`;
    } else if (["clouds", "fog", "mist"].includes(weatherMain)) {
      riskLevel = "Medium";
      reason = `Uncertain weather: ${weatherMain}`;
    }

    return {
      risk: riskLevel,
      reason,
      weather: {
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
      },
    };
  } catch (error) {
    console.error("Delay Agent Error:", error.message);
    return {
      risk: "Unknown",
      reason: "Unexpected error in delay agent",
    };
  }
};
