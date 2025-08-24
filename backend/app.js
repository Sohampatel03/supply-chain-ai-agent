import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import analysisRoutes from "./src/routes/analysisRoutes.js";
import CheckUserRouter from "./src/routes/checkUserId.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/supplier", CheckUserRouter); // ✅ register check route

app.get("/", (req, res) => {
  res.send("🚀 Supply Chain Risk Analyzer API Running...");
});

export default app;
