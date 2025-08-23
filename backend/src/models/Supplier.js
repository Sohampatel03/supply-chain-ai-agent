import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    name: { type: String, required: true },
    location: { type: String, required: true }, // City / Coordinates
    leadTime: { type: Number, required: true }, // in days
    transportMode: { type: String, enum: ["road", "air", "sea"], default: "road" },
    reliability: { type: Number, default: 80 }, // Supplier history score (0-100)
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
