// src/agents/riskAgent.js
// Pure function: takes suppliers array, returns array of { supplierId, riskScore, ... }

export const runRiskAgent = (suppliers = []) => {
  return suppliers.map((s) => {
    const reliability = Number(s.reliability ?? 80); // 0-100
    const leadTime = Number(s.leadTime ?? 10); // days
    const cost = Number(s.cost?.amount ?? 10000); // absolute

    // Normalize to 0..1
    const reliabilityNorm = 1 - reliability / 100; // low reliability = high risk
    const partReliability = reliabilityNorm * 0.5;            // 0..0.5
    const partLead = Math.min(1, leadTime / 30) * 0.3;        // 0..0.3
    const partCost = Math.min(1, cost / 100000) * 0.2;        // 0..0.2

    const riskScore = Number((partReliability + partLead + partCost).toFixed(3));

    return {
      supplierId: s._id,
      name: s.companyName, // ✅ updated
      riskScore, // 0..1 where higher = riskier
    };
  });
};
