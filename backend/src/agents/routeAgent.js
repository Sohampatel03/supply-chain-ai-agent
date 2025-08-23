// src/agents/routeAgent.js
import { getRoutes } from "../utils/mapsAPI.js";

export const runRouteAgent = async (suppliers = []) => {
  const results = [];

  for (const s of suppliers) {
    // make a maps API call - returns array of candidate routes
    // mapsAPI.getRoutes should return an array of { path, durationHours, distanceKm, costEstimate }
    let routes = [];
    try {
      routes = await getRoutes(s.location, s.destination);
    } catch (err) {
      // fallback: create a simple mock route if maps API not configured
      routes = [
        {
          path: [s.location, s.destination],
          durationHours: (s.leadTime ?? 24) * 24,
          distanceKm: 1000,
          costEstimate: s.cost ?? 0,
          notes: "mock-route"
        }
      ];
    }

    results.push({
      supplierId: s._id,
      name: s.name,
      routes,
    });
  }

  return results;
};
