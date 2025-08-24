// src/utils/userRoutes.js
import { getAlternateRoutes } from './map2.js';

 function getUserRoutes(origin, destination) {
  const routes = getAlternateRoutes(origin, destination);

  if (!routes || routes.length === 0) {
    return { message: "No routes found", safe: false, routes: [] };
  }

  const mainRoute = routes[0];

  if (mainRoute.riskLevel === 'Low' || mainRoute.riskLevel === 'Medium') {
    return {
      message: "Safe route",
      safe: true,
      route: mainRoute,
      alternates: []
    };
  } else {
    const alternates = routes.slice(1).filter(r => r.riskLevel === 'Low' || r.riskLevel === 'Medium');
    return {
      message: "Risky route, consider alternates",
      safe: false,
      route: mainRoute,
      alternates
    };
  }
}
export { getUserRoutes };