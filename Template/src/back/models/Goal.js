
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GoalSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true }, 
    resourceType: { type: String, enum: ["electricity", "water", "gas", "fuel", "carbon_footprint"], required: true },
    targetReductionPercentage: { type: Number, required: true, min: 0, max: 100 }, 
    baselineConsumption: { type: Number, required: true, min: 0 }, 
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["active", "achieved", "failed"], default: "active" }
  },
  { timestamps: true }
);

GoalSchema.index({ companyId: 1, deadline: 1 });

export default mongoose.models.Goal || model("Goal", GoalSchema);

