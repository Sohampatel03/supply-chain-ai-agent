// routes/supplierCheck.js
import express from "express";
import { checkSupplier } from "../controllers/checkUserIdController.js";
const CheckUserRouter = express.Router();

// GET /api/supplier/check/:userId
CheckUserRouter.get("/check/:userId", checkSupplier);

export default CheckUserRouter;
