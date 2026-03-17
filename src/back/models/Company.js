// =================================================================================
// ARQUIVO: models/Company.js
// DESCRIÇÃO: Define o Schema das Unidades Gestoras (Residências ou Empresas).
//            Atua como partição (Tenant) primária para o isolamento de dados.
// =================================================================================

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true, trim: true }, // Ex: "Valtinho's Bar"
  documentType: { type: String, enum: ["CPF", "CNPJ"], required: true },
  document: { type: String, required: true, unique: true, trim: true }, // Impede duplicação de CNPJ
  
  // Dados Básicos para Relatórios ESG
  address: { type: String, trim: true },
  
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Company || model("Company", CompanySchema);