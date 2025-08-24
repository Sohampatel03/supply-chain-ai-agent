// src/agents/routeAgent.js
import { getRoutes } from "../utils/mapsAPI.js";

export const runRouteAgent = async (suppliers = []) => {
  const results = [];

  for (const s of suppliers) {
    let routes = [];
    try {
      // ✅ use origin + destination from supplier.route
      routes = await getRoutes(s.route.origin, s.route.destination);
    } catch (err) {
      // fallback if API not available
      routes = [
        {
          path: [s.route.origin, s.route.destination],
          durationHours: (s.leadTime ?? 1) * 24,
          distanceKm: 1000,
          costEstimate: s.cost?.amount ?? 0,
          notes: "mock-route",
        },
      ];
    }

    results.push({
      supplierId: s._id,
      name: s.companyName, // ✅ updated (was s.name earlier)
      routes,
    });
  }

  return results;
};
