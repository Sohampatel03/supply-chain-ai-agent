// import Supplier from "../models/Supplier.js";
// import Analysis from "../models/Analysis.js";
// import { runRiskAgent } from "../agents/riskAgent.js";
// import { calculateDelayRisk } from "../agents/delayAgent.js";
// import { runCostAgent } from "../agents/costAgent.js";
// import { runRouteAgent } from "../agents/routeAgent.js";


// export const getSupplierById = async (req, res) => {
//   try {
//     const supplierId = req.params.id;
//     const userId = req.user._id; // From auth middleware

//     const supplier = await Supplier.findOne({
//       _id: supplierId,
//       user: userId // Ensure supplier belongs to authenticated user
//     });

//     if (!supplier) {
//       return res.status(404).json({
//         message: "Supplier not found or doesn't belong to user"
//       });
//     }

//     // Get latest analysis
//     const analysis = await Analysis.findOne({ 
//       user: userId, 
//       supplier: supplierId 
//     }).sort({ updatedAt: -1 });

//     return res.json({
//       supplier: {
//         _id: supplier._id,
//         companyName: supplier.companyName,
//         leadTime: supplier.leadTime,
//         transportMode: supplier.transportMode,
//         reliability: supplier.reliability,
//         route: supplier.route,
//         inventory: supplier.inventory,
//         contactInfo: supplier.contactInfo,
//         riskScore: analysis?.riskScore || null,
//         delayRisk: analysis?.delayRisk || null,
//         estimatedCost: analysis?.estimatedCost || null,
//         alternateRoutes: analysis?.alternateRoutes || null,
//         lastAnalyzed: analysis?.updatedAt || null
//       },
//       analysis: analysis
//     });

//   } catch (error) {
//     console.error("Get supplier by ID error:", error);
//     return res.status(500).json({
//       message: "Server error while fetching supplier",
//       error: error.message
//     });
//   }
// };
// // ➕ Add Supplier + Auto Analysis (Default Flow)
// export const addSupplier = async (req, res) => {
//   try {
//     const {
//       companyName,
//       leadTime,
//       transportMode,
//       cost,
//       route,
//       inventory,
//       reliability,
//     } = req.body;

//     // Step 1: Save supplier
//     const supplier = await Supplier.create({
//       user: req.user._id,
//       companyName,
//       leadTime,
//       transportMode,
//       cost,
//       route,
//       inventory,
//       reliability,
//     });

//     // Step 2: Run analysis only for this supplier
//     const [risk, delay, costEst, routeAlt] = await Promise.all([
//       runRiskAgent([supplier]),
//       calculateDelayRisk(supplier),
//       runCostAgent([supplier]),
//       runRouteAgent([supplier]),
//     ]);

//     // Step 3: Save analysis
//     const analysis = await Analysis.create({
//       user: req.user._id,
//       supplier: supplier._id,
//       riskScore: risk[0]?.riskScore ?? null,
//       delayRisk: delay?.risk ?? null,
//       estimatedCost: costEst[0]?.estimatedCost ?? null,
//       alternateRoutes: routeAlt[0]?.routes ?? null,
//     });

//     res.status(201).json({
//       message: "Supplier added & analyzed successfully",
//       supplier,
//       analysis,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 📂 Get All Suppliers (For Dropdown)
// export const getSuppliers = async (req, res) => {
//   try {
//     const suppliers = await Supplier.find({ user: req.user._id });
//     res.json(suppliers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ...existing code...

// // ✅ Get saved analysis for a specific supplier
// export const getSupplierAnalysis = async (req, res) => {
//   try {
//     const analysis = await Analysis.findOne({
//       user: req.user._id,
//       supplier: req.params.id,
//     });

//     if (!analysis) {
//       return res.status(404).json({ message: "No saved analysis found for this supplier" });
//     }

//     return res.json({
//       supplierId: analysis.supplier,
//       riskScore: analysis.riskScore,
//       delayRisk: analysis.delayRisk,
//       estimatedCost: analysis.estimatedCost,
//       alternateRoutes: analysis.alternateRoutes,
//       lastUpdated: analysis.updatedAt || analysis.createdAt,
//     });
//   } catch (err) {
//     console.error("Get supplier analysis error:", err);
//     return res.status(500).json({ message: "Failed to get supplier analysis", error: err.message });
//   }
// };

// // 🗑️ Delete Supplier
// export const deleteSupplier = async (req, res) => {
//   try {
//     const supplier = await Supplier.findById(req.params.id);

//     if (!supplier) {
//       return res.status(404).json({ message: "Supplier not found" });
//     }

//     if (supplier.user.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     await supplier.deleteOne();
//     await Analysis.deleteMany({ supplier: supplier._id }); // delete related analysis
//     res.json({ message: "Supplier and analysis removed" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✏️ Update Supplier
// export const updateSupplier = async (req, res) => {
//   try {
//     const supplier = await Supplier.findById(req.params.id);

//     if (!supplier) {
//       return res.status(404).json({ message: "Supplier not found" });
//     }

//     if (supplier.user.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     supplier.companyName = req.body.companyName || supplier.companyName;
//     supplier.leadTime = req.body.leadTime || supplier.leadTime;
//     supplier.transportMode = req.body.transportMode || supplier.transportMode;

//     if (req.body.cost) {
//       supplier.cost.amount = req.body.cost.amount || supplier.cost.amount;
//       supplier.cost.currency = req.body.cost.currency || supplier.cost.currency;
//     }

//     if (req.body.route) {
//       supplier.route.origin = req.body.route.origin || supplier.route.origin;
//       supplier.route.destination = req.body.route.destination || supplier.route.destination;
//       supplier.route.estimatedDays = req.body.route.estimatedDays || supplier.route.estimatedDays;
//     }

//     if (req.body.inventory) {
//       supplier.inventory = req.body.inventory;
//     }

//     supplier.reliability = req.body.reliability || supplier.reliability;

//     const updatedSupplier = await supplier.save();
//     res.json(updatedSupplier);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// src/controllers/supplierController.js
import Supplier from "../models/Supplier.js";
import Analysis from "../models/Analysis.js";
import { runRiskAgent } from "../agents/riskAgent.js";
import { calculateDelayRisk } from "../agents/delayAgent.js";
import { runCostAgent } from "../agents/costAgent.js";
import { runRouteAgent } from "../agents/routeAgent.js";

// ➕ Add Supplier + Auto Analysis
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

    // Run analysis for this supplier
    const [risk, delay, costEst, routeAlt] = await Promise.all([
      runRiskAgent([supplier]),
      calculateDelayRisk(supplier),
      runCostAgent([supplier]),
      runRouteAgent([supplier]),
    ]);

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
    console.error("Add supplier error:", error);
    res.status(500).json({ message: "Failed to add supplier", error: error.message });
  }
};

// 📂 Get all suppliers (dropdown or listing)
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    res.json(suppliers);
  } catch (error) {
    console.error("Get suppliers error:", error);
    res.status(500).json({ message: "Failed to fetch suppliers", error: error.message });
  }
};

// 🔹 Get single supplier by ID with latest analysis
export const getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const userId = req.user._id;

    const supplier = await Supplier.findOne({ _id: supplierId, user: userId });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found or doesn't belong to user" });

    const analysis = await Analysis.findOne({ user: userId, supplier: supplierId })
      .sort({ updatedAt: -1 });

    res.json({
      supplier: {
        _id: supplier._id,
        companyName: supplier.companyName,
        leadTime: supplier.leadTime,
        transportMode: supplier.transportMode,
        reliability: supplier.reliability,
        route: supplier.route,
        inventory: supplier.inventory,
        contactInfo: supplier.contactInfo,
        riskScore: analysis?.riskScore || null,
        delayRisk: analysis?.delayRisk || null,
        estimatedCost: analysis?.estimatedCost || null,
        alternateRoutes: analysis?.alternateRoutes || null,
        lastAnalyzed: analysis?.updatedAt || null,
      },
      analysis,
    });
  } catch (error) {
    console.error("Get supplier by ID error:", error);
    res.status(500).json({ message: "Server error while fetching supplier", error: error.message });
  }
};

// ✅ Get saved analysis for a supplier
export const getSupplierAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      user: req.user._id,
      supplier: req.params.id,
    });

    if (!analysis)
      return res.status(404).json({ message: "No saved analysis found for this supplier" });

    res.json({
      supplierId: analysis.supplier,
      riskScore: analysis.riskScore,
      delayRisk: analysis.delayRisk,
      estimatedCost: analysis.estimatedCost,
      alternateRoutes: analysis.alternateRoutes,
      lastUpdated: analysis.updatedAt || analysis.createdAt,
    });
  } catch (error) {
    console.error("Get supplier analysis error:", error);
    res.status(500).json({ message: "Failed to get supplier analysis", error: error.message });
  }
};

// ✏️ Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    if (supplier.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    // Update fields
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

    if (req.body.inventory) supplier.inventory = req.body.inventory;
    supplier.reliability = req.body.reliability || supplier.reliability;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    console.error("Update supplier error:", error);
    res.status(500).json({ message: "Failed to update supplier", error: error.message });
  }
};

// 🗑️ Delete supplier + related analysis
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    if (supplier.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await supplier.deleteOne();
    await Analysis.deleteMany({ supplier: supplier._id });
    res.json({ message: "Supplier and analysis removed" });
  } catch (error) {
    console.error("Delete supplier error:", error);
    res.status(500).json({ message: "Failed to delete supplier", error: error.message });
  }
};
