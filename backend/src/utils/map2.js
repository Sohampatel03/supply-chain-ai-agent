// Utility to clean city names (remove extra spaces, standardize capitalization)
function cleanCityName(city) {
  return city?.trim().replace(/\s+/g, ' ') || '';
}

// Risk levels
function getRiskLevel(riskScore) {
  if (riskScore <= 30) return 'Low';
  if (riskScore <= 60) return 'Medium';
  if (riskScore <= 80) return 'High';
  return 'Very High';
}

// Fallback route generator
function generateFallbackRoutes(origin, destination) {
  const distance = estimateDistance(origin, destination);
  const baseCost = Math.max(500, distance * 1.5);
  const baseTime = Math.max(4, Math.ceil(distance / 60));
  const baseRisk = Math.min(100, Math.max(20, distance / 15));

  return [
    {
      route: [origin, destination],
      totalCost: Math.round(baseCost),
      totalTime: Math.round(baseTime),
      totalRisk: Math.round(baseRisk),
      routeType: 'fallback-direct',
      hops: 1
    },
    {
      route: [origin, 'Transit Hub', destination],
      totalCost: Math.round(baseCost * 1.3),
      totalTime: Math.round(baseTime * 1.4),
      totalRisk: Math.round(baseRisk * 0.8),
      routeType: 'fallback-hub',
      hops: 2
    }
  ];
}

// Rough distance approximation
function estimateDistance(city1, city2) {
  const distances = {
    'Delhi-Mumbai': 1400, 'Delhi-Bangalore': 2100, 'Delhi-Chennai': 2200,
    'Delhi-Kolkata': 1500, 'Delhi-Hyderabad': 1600, 'Delhi-Pune': 1400,
    'Mumbai-Bangalore': 980, 'Mumbai-Chennai': 1340, 'Mumbai-Kolkata': 2000,
    'Mumbai-Hyderabad': 700, 'Mumbai-Pune': 150, 'Mumbai-Ahmedabad': 520,
    'Bangalore-Chennai': 350, 'Bangalore-Hyderabad': 570, 'Bangalore-Kolkata': 1870,
    'Chennai-Kolkata': 1670, 'Chennai-Hyderabad': 630, 'Hyderabad-Kolkata': 1500,
    'Delhi-Jaipur': 280, 'Delhi-Indore': 750, 'Mumbai-Nashik': 180,
    'Jaipur-Ahmedabad': 420, 'Indore-Nashik': 340
  };

  const key1 = `${city1}-${city2}`;
  const key2 = `${city2}-${city1}`;
  return distances[key1] || distances[key2] || 1000;
}

// Simplified graph
const cityGraph = {
  Delhi: [
    { city: 'Jaipur', cost: 1000, time: 8, riskScore: 40 },
    { city: 'Indore', cost: 1200, time: 10, riskScore: 50 },
    { city: 'Mumbai', cost: 2000, time: 18, riskScore: 70 },
  ],
  Jaipur: [
    { city: 'Ahmedabad', cost: 900, time: 7, riskScore: 30 },
    { city: 'Delhi', cost: 1000, time: 8, riskScore: 40 },
  ],
  Ahmedabad: [
    { city: 'Mumbai', cost: 800, time: 6, riskScore: 30 },
  ],
  Indore: [
    { city: 'Nashik', cost: 700, time: 6, riskScore: 40 },
    { city: 'Delhi', cost: 1200, time: 10, riskScore: 50 },
  ],
  Nashik: [
    { city: 'Mumbai', cost: 600, time: 5, riskScore: 40 },
  ],
  Mumbai: []
};

// Route-finding using BFS
function findBestRoutes(origin, destination, criteria = 'riskScore') {
  if (!origin || !destination) return generateFallbackRoutes(origin || 'Delhi', destination || 'Mumbai');
  if (origin === destination) return [{ route: [origin], totalCost: 0, totalTime: 0, totalRisk: 0 }];
  if (!cityGraph[origin]) return generateFallbackRoutes(origin, destination);

  const visited = new Set();
  const queue = [{ city: origin, path: [origin], cost: 0, time: 0, riskScore: 0 }];
  const results = [];

  while (queue.length && results.length < 5) {
    const current = queue.shift();
    if (current.city === destination) {
      results.push({
        route: current.path,
        totalCost: current.cost,
        totalTime: current.time,
        totalRisk: current.riskScore
      });
      continue;
    }

    const neighbors = cityGraph[current.city] || [];
    for (const neighbor of neighbors) {
      if (!current.path.includes(neighbor.city)) {
        queue.push({
          city: neighbor.city,
          path: [...current.path, neighbor.city],
          cost: current.cost + neighbor.cost,
          time: current.time + neighbor.time,
          riskScore: current.riskScore + neighbor.riskScore
        });
      }
    }
  }

  return results.length ? results.sort((a, b) => {
    if (criteria === 'riskScore') return a.totalRisk - b.totalRisk;
    if (criteria === 'cost') return a.totalCost - b.totalCost;
    if (criteria === 'time') return a.totalTime - b.totalTime;
    return a.totalRisk - b.totalRisk;
  }) : generateFallbackRoutes(origin, destination);
}

// Main API function
function getAlternateRoutes(origin, destination, criteria = 'riskScore') {
  try {
    const cleanOrigin = cleanCityName(origin);
    const cleanDestination = cleanCityName(destination);

    const routes = findBestRoutes(cleanOrigin, cleanDestination, criteria);
    if (!routes || routes.length === 0) return [];

    const annotatedRoutes = routes.map(route => {
      const riskLevel = getRiskLevel(route.totalRisk);
      return {
        route: route.route.join(' -> '),
        totalCost: route.totalCost,
        totalTime: +(route.totalTime / 24).toFixed(1),
        totalRisk: route.totalRisk,
        riskLevel: riskLevel,
        safe: riskLevel === 'Low' || riskLevel === 'Medium',
        rawData: {
          path: route.route,
          cost: route.totalCost,
          timeHours: route.totalTime,
          riskScore: route.totalRisk
        }
      };
    });

    // Only return routes that are NOT low risk
    const riskyRoutes = annotatedRoutes.filter(r => r.riskLevel !== 'Low');

    return riskyRoutes;
  } catch (err) {
    console.error(err);
    return [];
  }
}


// Alias for compatibility
const getRoutes = getAlternateRoutes;

// ✅ Proper exports
export { generateFallbackRoutes, getAlternateRoutes, getRoutes };
