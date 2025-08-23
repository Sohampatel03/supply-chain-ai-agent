import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    supplier: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Supplier", 
      required: true 
    },
    riskScore: { type: Number },     // riskAgent result
    delayRisk: { type: String },     // delayAgent result (Low/Medium/High)
    estimatedCost: { type: Number }, // costAgent result
    alternateRoutes: { type: Array }, // routeAgent result (list of routes)
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);
