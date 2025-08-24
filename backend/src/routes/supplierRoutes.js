// routes/supplierRoutes.js
import express from "express";
import {
  addSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
  getSupplierById,
} from "../controllers/supplierController.js";
import {
  runSupplierAnalysis,     // ✅ fresh analysis
  getSupplierAnalysis,     // ✅ saved analysis
} from "../controllers/analysisController.js"; 
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------- Supplier CRUD --------------------
router.post("/", protect, addSupplier);
router.get("/", protect, getSuppliers);
router.put("/:id", protect, updateSupplier);
router.delete("/:id", protect, deleteSupplier);
router.get("/:id", protect, getSupplierById);

// ---------------- Supplier + Auto Analysis ----------------
// 👉 Add supplier + run analysis immediately
router.post("/with-analysis", protect, addSupplier);

// ---------------- Single Supplier Analysis ----------------
// 👉 Get fresh analysis (agents run hote hai)
router.get("/:id/analysis", protect, runSupplierAnalysis);

// 👉 Get saved analysis (DB se last saved result)
router.get("/:id/saved-analysis", protect, getSupplierAnalysis);

export default router;
