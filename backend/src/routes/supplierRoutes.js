import express from "express";
import {
  addSupplier,
  getSuppliers,
  deleteSupplier,
} from "../controllers/supplierController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Supplier Routes
router.post("/", protect, addSupplier); // add supplier
router.get("/", protect, getSuppliers); // get all suppliers
router.delete("/:id", protect, deleteSupplier); // delete supplier

export default router;
