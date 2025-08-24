// src/controllers/analysisController.js
import Supplier from "../models/Supplier.js";
import Analysis from "../models/Analysis.js";

import { runRiskAgent } from "../agents/riskAgent.js";
import { calculateDelayRisk } from "../agents/delayAgent.js";
import { runCostAgent } from "../agents/costAgent.js";
import { runRouteAgent } from "../agents/routeAgent.js";

// ✅ Global analysis for all suppliers
export const runAnalysis = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });

    if (!suppliers || suppliers.length === 0) {
      return res.status(400).json({ message: "No suppliers found for this user" });
    }

    const [riskResults, delayResults, costResults, routeResults] = await Promise.all([
      runRiskAgent(suppliers),
      Promise.all(suppliers.map(calculateDelayRisk)),
      runCostAgent(suppliers),
      runRouteAgent(suppliers)
    ]);

    const combined = suppliers.map((s, index) => {
      const sid = s._id.toString();
      const risk = riskResults.find(r => r?.supplierId?.toString() === sid) || {};
      const cost = costResults.find(c => c?.supplierId?.toString() === sid) || {};
      const route = routeResults.find(r => r?.supplierId?.toString() === sid) || {};
      const delay = delayResults[index] || {};

      return {
        supplierId: sid,
        supplierName: s.companyName,
        riskScore: risk.riskScore ?? null,
        delayRisk: delay.risk ?? null,
        estimatedCost: cost.estimatedCost ?? null,
        routes: route.routes ?? null,
      };
    });

    const analysisDocs = combined.map((c) => ({
      user: req.user._id,
      supplier: c.supplierId,
      riskScore: c.riskScore,
      delayRisk: c.delayRisk,
      estimatedCost: c.estimatedCost,
      alternateRoutes: c.routes,
    }));

    await Analysis.deleteMany({ user: req.user._id }); // ❗ Optional: Purana hatao phir save karo
    const saved = await Analysis.insertMany(analysisDocs);

    return res.json({
      message: "Analysis completed",
      summary: { overallSuppliers: suppliers.length, savedCount: saved.length },
      results: combined,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return res.status(500).json({ message: "Analysis failed", error: err.message });
  }
};

// ✅ Single supplier fresh analysis (rerun agents)
export const runSupplierAnalysis = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Run agents for just this supplier
    const [risk, delay, cost, route] = await Promise.all([
      runRiskAgent([supplier]),
      calculateDelayRisk(supplier),
      runCostAgent([supplier]),
      runRouteAgent([supplier])
    ]);

    const analysisData = {
      user: req.user._id,
      supplier: supplier._id,
      riskScore: risk?.[0]?.riskScore ?? null,
      delayRisk: delay?.risk ?? null,
      estimatedCost: cost?.[0]?.estimatedCost ?? null,
      alternateRoutes: route?.[0]?.routes ?? null,
    };

    // Save to DB (replace old one for this supplier)
    await Analysis.findOneAndUpdate(
      { user: req.user._id, supplier: supplier._id },
      analysisData,
      { upsert: true, new: true }
    );

    return res.json({
      message: "Supplier analysis completed",
      supplier: supplier.companyName,
      result: analysisData,
    });
  } catch (err) {
    console.error("Supplier analysis error:", err);
    return res.status(500).json({ message: "Analysis failed", error: err.message });
  }
};

// ✅ Fetch saved analysis for dropdown selection (with fallback to run fresh)
export const getSupplierAnalysis = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    let analysis = await Analysis.findOne({
      user: req.user._id,
      supplier: supplier._id,
    });

    // ⚡ Fallback: Agar analysis nahi mila toh fresh run karo
    if (!analysis) {
      const [risk, delay, cost, route] = await Promise.all([
        runRiskAgent([supplier]),
        calculateDelayRisk(supplier),
        runCostAgent([supplier]),
        runRouteAgent([supplier]),
      ]);

      const analysisData = {
        user: req.user._id,
        supplier: supplier._id,
        riskScore: risk?.[0]?.riskScore ?? null,
        delayRisk: delay?.risk ?? null,
        estimatedCost: cost?.[0]?.estimatedCost ?? null,
        alternateRoutes: route?.[0]?.routes ?? null,
      };

      analysis = await Analysis.findOneAndUpdate(
        { user: req.user._id, supplier: supplier._id },
        analysisData,
        { upsert: true, new: true }
      );
    }

    return res.json({
      supplier: supplier.companyName,
      analysis,
    });
  } catch (err) {
    console.error("Get supplier analysis error:", err);
    return res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
