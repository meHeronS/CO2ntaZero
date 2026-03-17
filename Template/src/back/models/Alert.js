
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AlertSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
  consumptionId: { type: Schema.Types.ObjectId, ref: "Consumption" },
  goalId: { type: Schema.Types.ObjectId, ref: "Goal" },
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  
  type: { 
    type: String, 
    enum: ["anomaly_detected", "goal_achieved", "goal_failed", "general_warning", "limit_approaching"], 
    required: true 
  },
  
  severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  
  metadata: { type: Schema.Types.Mixed } // Para armazenar dados extras (ex: valor da média histórica)
}, {
  timestamps: true
});

AlertSchema.index({ companyId: 1, read: 1, createdAt: -1 });

export default mongoose.models.Alert || model("Alert", AlertSchema);
