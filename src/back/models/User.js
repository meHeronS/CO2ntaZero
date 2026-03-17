// =================================================================================
// ARQUIVO: models/User.js
// DESCRIÇÃO: Define o Schema de Usuários. Implementa a base do "Single Owner",
//            onde um CPF/Email loga e gerencia o contexto de suas empresas.
// =================================================================================

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  
  // Contexto Atual: ID da empresa/residência que o usuário está operando no momento
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  
  // Múltiplas Unidades: Lista de todas as unidades que este usuário é dono (ex: Casa, Bar)
  companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
  
  role: { type: String, enum: ["ADMIN", "MANAGER", "USER"], default: "ADMIN" },
  
  // Campo checado pelo authMiddleware para bloquear logins indesejados
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || model("User", UserSchema);