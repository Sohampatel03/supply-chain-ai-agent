// src/agents/costAgent.js
import { getFuelIndex } from "../utils/helpers.js";

export const runCostAgent = async (suppliers = []) => {
  const fuelIndex = await getFuelIndex(); // e.g., 1.0 default

  return suppliers.map((s) => {
    // ✅ base cost ab nested h
    const baseCost = Number(s.cost?.amount ?? 0);
    const leadTime = Number(s.leadTime ?? 0);

    // Example: fuel/operation adds cost proportional to leadTime
    const fuelSurcharge = fuelIndex * leadTime * 5; // arbitrary factor

    // ✅ holdingCostPerDay schema me nahi hai → fixed default le raha hai
    const holdingCostPerDay = 50;
    const inventoryCarry = leadTime * holdingCostPerDay;

    const estimatedCost = Number(
      (baseCost + fuelSurcharge + inventoryCarry).toFixed(2)
    );

    return {
      supplierId: s._id,
      name: s.companyName, // ✅ updated (was s.name earlier)
      estimatedCost,
      currency: s.cost?.currency ?? "INR", // ✅ added currency handling
      fuelIndex,
    };
  });
};
