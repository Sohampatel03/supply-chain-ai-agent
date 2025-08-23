import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import analysisRoutes from "./src/routes/analysisRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/analysis", analysisRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Supply Chain Risk Analyzer API Running...");
});

export default app;
