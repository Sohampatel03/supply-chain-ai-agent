import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    leadTime: { type: Number, required: true }, // in days
    transportMode: {
      type: String,
      enum: ["road", "air", "sea"],
      default: "road",
    },

    // Cost details (amount + currency)
    cost: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "INR" },
    },

    // Route details
    route: {
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      estimatedDays: { type: Number }, // optional
    },

    // Inventory details
    inventory: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    reliability: { type: Number, default: 80 }, // Supplier history score (0-100)
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);