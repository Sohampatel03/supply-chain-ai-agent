import { getWeatherByCity } from "../utils/weatherAPI.js";

/**
 * Calculate delay risk based on weather for origin & destination
 */
export const calculateDelayRisk = async (supplier) => {
  try {
    // ✅ Origin aur Destination check karo
    if (!supplier?.route?.origin || !supplier?.route?.destination) {
      return {
        supplierId: supplier?._id ?? null,
        risk: "Unknown",
        reason: "Supplier route (origin/destination) missing",
      };
    }

    // ✅ Weather API call for origin
    const originWeather = await getWeatherByCity(supplier.route.origin);
    const destWeather = await getWeatherByCity(supplier.route.destination);

    console.log("🌦 Origin Weather:", originWeather);
    console.log("🌦 Destination Weather:", destWeather);

    // ✅ Helper to extract weather main
    const getWeatherMain = (data) =>
      data?.weather?.[0]?.main?.toLowerCase() ?? null;

    const originMain = getWeatherMain(originWeather);
    const destMain = getWeatherMain(destWeather);

    if (!originMain && !destMain) {
      return {
        supplierId: supplier._id,
        risk: "Unknown",
        reason: "Weather API failed for both cities",
      };
    }

    // ✅ Default risk
    let riskLevel = "Low";
    let reason = `Clear weather at origin(${originMain}) & destination(${destMain})`;

    // ✅ Check risky weather
    const risky = ["rain", "storm", "snow", "thunderstorm"];
    const medium = ["clouds", "fog", "mist"];

    if (risky.includes(originMain) || risky.includes(destMain)) {
      riskLevel = "High";
      reason = `Bad weather detected at ${
        risky.includes(originMain) ? supplier.route.origin : supplier.route.destination
      }`;
    } else if (medium.includes(originMain) || medium.includes(destMain)) {
      riskLevel = "Medium";
      reason = `Uncertain weather at ${
        medium.includes(originMain) ? supplier.route.origin : supplier.route.destination
      }`;
    }

    return {
      supplierId: supplier._id,
      risk: riskLevel,
      reason,
      weather: {
        origin: {
          city: supplier.route.origin,
          condition: originMain,
          temp: originWeather?.main?.temp ?? null,
          humidity: originWeather?.main?.humidity ?? null,
        },
        destination: {
          city: supplier.route.destination,
          condition: destMain,
          temp: destWeather?.main?.temp ?? null,
          humidity: destWeather?.main?.humidity ?? null,
        },
      },
    };
  } catch (error) {
    console.error("Delay Agent Error:", error.message);
    return {
      supplierId: supplier?._id ?? null,
      risk: "Unknown",
      reason: "Unexpected error in delay agent",
    };
  }
};
