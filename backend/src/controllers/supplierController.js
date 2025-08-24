import Supplier from "../models/Supplier.js";
import Analysis from "../models/Analysis.js";
import { runRiskAgent } from "../agents/riskAgent.js";
import { calculateDelayRisk } from "../agents/delayAgent.js";
import { runCostAgent } from "../agents/costAgent.js";
import { runRouteAgent } from "../agents/routeAgent.js";

// ➕ Add Supplier + Auto Analysis (Default Flow)
export const addSupplier = async (req, res) => {
  try {
    const {
      companyName,
      leadTime,
      transportMode,
      cost,
      route,
      inventory,
      reliability,
    } = req.body;

    // Step 1: Save supplier
    const supplier = await Supplier.create({
      user: req.user._id,
      companyName,
      leadTime,
      transportMode,
      cost,
      route,
      inventory,
      reliability,
    });

    // Step 2: Run analysis only for this supplier
    const [risk, delay, costEst, routeAlt] = await Promise.all([
      runRiskAgent([supplier]),
      calculateDelayRisk(supplier),
      runCostAgent([supplier]),
      runRouteAgent([supplier]),
    ]);

    // Step 3: Save analysis
    const analysis = await Analysis.create({
      user: req.user._id,
      supplier: supplier._id,
      riskScore: risk[0]?.riskScore ?? null,
      delayRisk: delay?.risk ?? null,
      estimatedCost: costEst[0]?.estimatedCost ?? null,
      alternateRoutes: routeAlt[0]?.routes ?? null,
    });

    res.status(201).json({
      message: "Supplier added & analyzed successfully",
      supplier,
      analysis,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📂 Get All Suppliers (For Dropdown)
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get Analysis for a Single Supplier (Dropdown Select)
export const getSupplierAnalysis = async (req, res) => {
  try { 
    const supplierId = req.params.id;

    const analysis = await Analysis.findOne({
      user: req.user._id,
      supplier: supplierId,
    });

    if (!analysis) {
      return res.status(404).json({ message: "No analysis found for supplier" });
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Delete Supplier
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    if (supplier.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await supplier.deleteOne();
    await Analysis.deleteMany({ supplier: supplier._id }); // delete related analysis
    res.json({ message: "Supplier and analysis removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    if (supplier.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    supplier.companyName = req.body.companyName || supplier.companyName;
    supplier.leadTime = req.body.leadTime || supplier.leadTime;
    supplier.transportMode = req.body.transportMode || supplier.transportMode;

    if (req.body.cost) {
      supplier.cost.amount = req.body.cost.amount || supplier.cost.amount;
      supplier.cost.currency = req.body.cost.currency || supplier.cost.currency;
    }

    if (req.body.route) {
      supplier.route.origin = req.body.route.origin || supplier.route.origin;
      supplier.route.destination = req.body.route.destination || supplier.route.destination;
      supplier.route.estimatedDays = req.body.route.estimatedDays || supplier.route.estimatedDays;
    }

    if (req.body.inventory) {
      supplier.inventory = req.body.inventory;
    }

    supplier.reliability = req.body.reliability || supplier.reliability;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};