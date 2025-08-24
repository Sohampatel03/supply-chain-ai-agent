// src/routes/analysisRoutes.js
import express from "express";
import { runAnalysis } from "../controllers/analysisController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/analysis/run  -- triggers agents and stores results
router.get("/run", protect, runAnalysis);

// optional: GET /api/analysis/latest  -> return last N analysis for user (you can add later)

export default router;
