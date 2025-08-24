// src/routes/analysisRoutes.js
import express from "express";
import { 
  runAnalysis, 
  runSupplierAnalysis, 
  getAlerts, 
  getRiskCategories, 
  getDashboardSummary 
} from "../controllers/analysisController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/analysis/run  -- triggers agents and stores results
router.post("/run", protect, runAnalysis);

// POST /api/analysis/supplier/:id  -- run analysis for specific supplier
router.post("/supplier/:id", protect, runSupplierAnalysis);

// GET /api/analysis/alerts  -- get dynamic alerts for dashboard
router.get("/alerts", protect, getAlerts);

// GET /api/analysis/risk-categories  -- get risk categories with dynamic data
router.get("/risk-categories", protect, getRiskCategories);

// GET /api/analysis/dashboard-summary  -- get dashboard summary data
router.get("/dashboard-summary", protect, getDashboardSummary);

export default router;
