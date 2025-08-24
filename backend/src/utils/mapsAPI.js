// src/utils/mapsAPI.js
// Minimal stub for getRoutes. Replace with OpenRouteService / Mapbox later.

export const getRoutes = async (origin, destination) => {
  // If MAPS_API_KEY present, call real directions API.
  // Fallback: return 2 mocked routes
  return [
    {
      path: [origin, "Interim Hub", destination],
      durationHours: 48,
      distanceKm: 1200,
      costEstimate: 5000,
      notes: "primary-route"
    },
    {
      path: [origin, "Alternate Hub", destination],
      durationHours: 60,
      distanceKm: 1500,
      costEstimate: 6000,
      notes: "alternate-route"
    }
  ];
};
