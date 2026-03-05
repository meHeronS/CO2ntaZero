
// =================================================================================
// ARQUIVO: models/Consumption.js
// DESCRI��O: Define o Schema para a cole��o Consumptions no MongoDB.
//            Representa o consumo de recursos (�gua, energia, etc.) para c�lculo de pegada de carbono.
// =================================================================================

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ConsumptionSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  
  // Tipo do recurso consumido
  resourceType: { 
    type: String, 
    enum: ["electricity", "water", "gas", "fuel", "fuel_gasoline", "fuel_diesel", "fuel_ethanol", "waste"],
    required: true 
  },

  // Quantidade consumida na unidade f�sica
  quantity: { type: Number, required: true, min: 0 },
  
  // Unidade de medida (ex: kWh, m3, liters, kg)
  unit: { 
    type: String, 
    required: true,
    enum: ["kWh", "m3", "liters", "L", "kg", "gallons"]
  },

  // Valor monet�rio associado (custo da fatura/conta)
  cost: { type: Number, min: 0 },

  // Data do consumo/fatura
  date: { type: Date, required: true, default: Date.now },

  // Pegada de carbono calculada (em kg CO2e)
  carbonFootprint: { type: Number, default: 0 },

  // Fator de emiss�o utilizado no c�lculo
  emissionFactorUsed: { type: Number },
  
  // Descri��o
  description: { type: String, trim: true },
  
  // Arquivo de comprovante/fatura
  attachment: { type: String },

  // Status
  status: { 
    type: String, 
    enum: ["verified", "estimated", "manual_input"],
    default: "manual_input" 
  },
  
  deleted: { type: Boolean, default: false, select: false },
  deletedAt: { type: Date, select: false }

}, { timestamps: true });

ConsumptionSchema.index({ companyId: 1, date: -1 });

export default mongoose.models.Consumption || model("Consumption", ConsumptionSchema);

