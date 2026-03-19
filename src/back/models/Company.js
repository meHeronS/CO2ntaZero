// =================================================================================
// ARQUIVO: models/Company.js
// DESCRIÇÃO: Define o Schema das Unidades Gestoras (Residências ou Empresas).
//            Atua como partição (Tenant) primária para o isolamento de dados.
// =================================================================================

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true, trim: true }, // Ex: "Valtinho's Bar"
  type: { type: String, enum: ["BUSINESS", "RESIDENTIAL"], required: true, default: "BUSINESS" },
  cnpj: { type: String, trim: true, unique: true, sparse: true }, // sparse permite que seja nulo em RESIDENTIAL, mas único se preenchido
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  plan: { type: String, enum: ["BASIC", "PREMIUM", "PRO"], default: "BASIC" },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  
  // Dados Básicos para Relatórios ESG
  address: { type: String, trim: true },
  
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Company || model("Company", CompanySchema);