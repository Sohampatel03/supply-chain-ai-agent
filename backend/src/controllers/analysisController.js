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
      result: {
        supplierId: supplier._id,
        supplierName: supplier.companyName,
        riskScore: analysisData.riskScore,
        delayRisk: analysisData.delayRisk,
        estimatedCost: analysisData.estimatedCost,
        routes: analysisData.alternateRoutes,
      },
    });
  } catch (err) {
    console.error("Supplier analysis error:", err);
    return res.status(500).json({ message: "Supplier analysis failed", error: err.message });
  }
};

// ✅ Get dynamic alerts for dashboard
export const getAlerts = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    const analyses = await Analysis.find({ user: req.user._id });

    const alerts = [];

    // Generate weather alerts based on supplier locations
    suppliers.forEach(supplier => {
      if (supplier.route?.origin && supplier.route?.destination) {
        alerts.push({
          id: `weather-${supplier._id}`,
          message: `Heavy rain expected tomorrow in ${supplier.route.origin} to ${supplier.route.destination} route.`,
          type: 'Weather',
          time: '2 hours ago',
          severity: 'moderate'
        });
      }
    });

    // Generate geopolitical alerts
    if (suppliers.length > 0) {
      alerts.push({
        id: 'geopolitical-1',
        message: 'Border strike reported near checkpoint 3. Possible delays expected.',
        type: 'Geopolitical',
        time: '5 hours ago',
        severity: 'high'
      });
    }

    // Generate operational alerts based on cost analysis
    analyses.forEach(analysis => {
      if (analysis.estimatedCost && analysis.estimatedCost > 1000000) {
        alerts.push({
          id: `cost-${analysis.supplier}`,
          message: `High cost alert: ₹${analysis.estimatedCost.toLocaleString()} for supplier analysis.`,
          type: 'Operational',
          time: 'Today',
          severity: 'medium'
        });
      }
    });

    // Generate risk-based alerts
    analyses.forEach(analysis => {
      if (analysis.riskScore && analysis.riskScore > 70) {
        alerts.push({
          id: `risk-${analysis.supplier}`,
          message: `High risk alert: Risk score ${analysis.riskScore} for supplier.`,
          type: 'Risk',
          time: '1 hour ago',
          severity: 'high'
        });
      }
    });

    return res.json({
      alerts: alerts.slice(0, 10), // Return top 10 alerts
      totalCount: alerts.length
    });
  } catch (err) {
    console.error("Get alerts error:", err);
    return res.status(500).json({ message: "Failed to get alerts", error: err.message });
  }
};

// ✅ Get enhanced risk categories with dynamic data
export const getRiskCategories = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    const analyses = await Analysis.find({ user: req.user._id });

    const riskCategories = [
      {
        key: 'weather',
        icon: '🌦️',
        label: 'Weather Risks',
        level: 'Moderate',
        color: 'yellow',
        details: 'Possible heavy rain and thunderstorms expected along the route. Monitor weather updates.',
        affectedSuppliers: suppliers.filter(s => s.route?.origin).length
      },
      {
        key: 'route',
        icon: '🛣️',
        label: 'Route Risks',
        level: 'Safe',
        color: 'green',
        details: 'No major traffic or roadblocks detected. Route is clear.',
        affectedSuppliers: suppliers.length
      },
      {
        key: 'marine',
        icon: '🚢',
        label: 'Marine/Port Risks',
        level: 'Safe',
        color: 'green',
        details: 'No port congestion or marine delays reported.',
        affectedSuppliers: suppliers.filter(s => s.transportMode === 'Marine').length
      },
      {
        key: 'geopolitical',
        icon: '🌍',
        label: 'Geopolitical Risks',
        level: 'High',
        color: 'red',
        details: 'Border strikes and regional unrest may impact delivery schedule.',
        affectedSuppliers: suppliers.length
      },
      {
        key: 'fuel',
        icon: '⛽',
        label: 'Fuel/Operational Risks',
        level: 'Moderate',
        color: 'yellow',
        details: 'Fuel prices are volatile. Operational costs may increase.',
        affectedSuppliers: suppliers.length
      },
    ];

    // Update risk levels based on actual analysis data
    const highRiskCount = analyses.filter(a => a.riskScore > 70).length;
    const moderateRiskCount = analyses.filter(a => a.riskScore > 40 && a.riskScore <= 70).length;

    if (highRiskCount > 0) {
      riskCategories[3].level = 'High'; // Geopolitical
      riskCategories[3].color = 'red';
    }

    if (moderateRiskCount > 0) {
      riskCategories[4].level = 'Moderate'; // Fuel
      riskCategories[4].color = 'yellow';
    }

    return res.json({
      riskCategories,
      summary: {
        totalSuppliers: suppliers.length,
        highRiskSuppliers: highRiskCount,
        moderateRiskSuppliers: moderateRiskCount,
        lowRiskSuppliers: analyses.filter(a => a.riskScore <= 40).length
      }
    });
  } catch (err) {
    console.error("Get risk categories error:", err);
    return res.status(500).json({ message: "Failed to get risk categories", error: err.message });
  }
};

// ✅ Get dashboard summary data
export const getDashboardSummary = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    const analyses = await Analysis.find({ user: req.user._id });

    const totalCost = analyses.reduce((sum, analysis) => sum + (analysis.estimatedCost || 0), 0);
    const averageRiskScore = analyses.length > 0 
      ? analyses.reduce((sum, analysis) => sum + (analysis.riskScore || 0), 0) / analyses.length 
      : 0;

    const summary = {
      totalSuppliers: suppliers.length,
      totalCost: totalCost,
      averageRiskScore: Math.round(averageRiskScore),
      highRiskSuppliers: analyses.filter(a => a.riskScore > 70).length,
      moderateRiskSuppliers: analyses.filter(a => a.riskScore > 40 && a.riskScore <= 70).length,
      lowRiskSuppliers: analyses.filter(a => a.riskScore <= 40).length,
      lastUpdated: new Date().toISOString()
    };

    return res.json(summary);
  } catch (err) {
    console.error("Get dashboard summary error:", err);
    return res.status(500).json({ message: "Failed to get dashboard summary", error: err.message });
  }
};
