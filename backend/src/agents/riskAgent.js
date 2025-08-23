// src/agents/riskAgent.js
// Pure function: takes suppliers array, returns array of { supplierId, riskScore, ... }

export const runRiskAgent = (suppliers = []) => {
  return suppliers.map((s) => {
    const reliability = s.reliability ?? s.reliabilityScore ?? 0.8; // 0..1
    const leadTime = Number(s.leadTime ?? 10); // days
    const cost = Number(s.cost ?? s.baseCost ?? 10000); // absolute

    // Example weighted formula -> normalized to 0..1 (approx)
    const partReliability = (1 - reliability) * 0.5;            // 0..0.5
    const partLead = Math.min(1, leadTime / 30) * 0.3;          // 0..0.3
    const partCost = Math.min(1, cost / 100000) * 0.2;          // 0..0.2

    const riskScore = Number((partReliability + partLead + partCost).toFixed(3));

    return {
      supplierId: s._id,
      name: s.name,
      riskScore, // 0..1 where higher = riskier
    };
  });
};
