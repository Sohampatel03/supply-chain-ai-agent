// src/controllers/analysisController.js
import Supplier from "../models/Supplier.js";
import Analysis from "../models/Analysis.js";

import { runRiskAgent } from "../agents/riskAgent.js";
import { calculateDelayRisk } from "../agents/delayAgent.js";
import { runCostAgent } from "../agents/costAgent.js";
import { runRouteAgent } from "../agents/routeAgent.js";

export const runAnalysis = async (req, res) => {
  try {
    // fetch user suppliers
    const suppliers = await Supplier.find({ user: req.user._id });

    if (!suppliers || suppliers.length === 0) {
      return res.status(400).json({ message: "No suppliers found for this user" });
    }

    // run agents in parallel where possible
    const [riskResults, delayResults, costResults, routeResults] = await Promise.all([
      runRiskAgent(suppliers),
      Promise.all(suppliers.map(calculateDelayRisk)), // Correctly calling the function for each supplier
      runCostAgent(suppliers),
      runRouteAgent(suppliers)
    ]);

    // ✅ Fix: Use index to match delay results, and check for undefined
    const combined = suppliers.map((s, index) => {
      const sid = s._id.toString();
      const risk = riskResults.find(r => r && r.supplierId && r.supplierId.toString() === sid) || {};
      const cost = costResults.find(c => c && c.supplierId && c.supplierId.toString() === sid) || {};
      const route = routeResults.find(r => r && r.supplierId && r.supplierId.toString() === sid) || {};
      
      // ✅ Here's the fix: Get the result by index.
      const delay = delayResults[index] || {}; 

      return {
        supplierId: sid,
        supplierName: s.name,
        riskScore: risk.riskScore ?? null,
        delayRisk: delay.risk ?? null, // Note: The property is 'risk' from your agent
        estimatedCost: cost.estimatedCost ?? null,
        routes: route.routes ?? null,
      };
    });

    // Save analysis entries (one per supplier) — you can also store a single aggregated doc
    const analysisDocs = combined.map((c) => ({
      user: req.user._id,
      supplier: c.supplierId,
      riskScore: c.riskScore,
      delayRisk: c.delayRisk,
      estimatedCost: c.estimatedCost,
      alternateRoutes: c.routes,
    }));

    // Remove old analyses for this user if you want single latest snapshot OR keep history
    // await Analysis.deleteMany({ user: req.user._id });

    const saved = await Analysis.insertMany(analysisDocs);

    return res.json({
      message: "Analysis completed",
      summary: {
        overallSuppliers: suppliers.length,
        savedCount: saved.length
      },
      results: combined,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return res.status(500).json({ message: "Analysis failed", error: err.message });
  }
};