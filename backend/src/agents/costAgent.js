// src/agents/costAgent.js
import { getFuelIndex } from "../utils/helpers.js";

export const runCostAgent = async (suppliers = []) => {
  const fuelIndex = await getFuelIndex(); // e.g., 1.0 default

  return suppliers.map((s) => {
    const baseCost = Number(s.cost ?? 0);
    const leadTime = Number(s.leadTime ?? 0);

    // Example: fuel/operation adds cost proportional to leadTime
    // tweak multiplier for realistic behavior
    const fuelSurcharge = fuelIndex * leadTime * 5; // arbitrary factor
    const inventoryCarry = leadTime * ( (s.holdingCostPerDay ?? 50) ); // per day holding cost
    const estimatedCost = Number((baseCost + fuelSurcharge + inventoryCarry).toFixed(2));

    return {
      supplierId: s._id,
      name: s.name,
      estimatedCost,
      fuelIndex,
    };
  });
};
