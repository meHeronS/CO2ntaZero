// =================================================================================
// ARQUIVO: models/Company.js
// DESCRIÇÃO: Define o Schema para a coleção 'Companies' no MongoDB.
//            Este é o modelo central da arquitetura multi-tenant do sistema.
//            Cada documento 'Company' representa uma unidade (empresa ou residência)
//            e serve como a raiz para o isolamento de todos os outros dados,
//            como usuários, transações, clientes, etc.
// =================================================================================

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
  // Referência ao dono da empresa (Pessoa Física / CPF responsável)
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  
  // Tipo de unidade: Empresa ou Residência
  type: { type: String, enum: ["BUSINESS", "RESIDENTIAL"], default: "BUSINESS" },

  // Nome fantasia da empresa.
  name: { type: String, required: true, trim: true },
  
  // CNPJ: Obrigatório apenas para empresas (BUSINESS). 'sparse' permite que residências não tenham este campo.
  cnpj: { 
    type: String, 
    unique: true, 
    trim: true, 
    sparse: true,
    required: function() { return this.type === 'BUSINESS'; }
  },
  // E-mail corporativo: Obrigatório apenas para empresas.
  email: { 
    type: String, 
    trim: true, 
    lowercase: true, 
    unique: true, 
    sparse: true,
    required: function() { return this.type === 'BUSINESS'; }
  },
  // Telefone principal de contato.
  phone: { type: String, trim: true },
  // Endereço físico. Obrigatório para residências para garantir que a unidade existe (não é fantasma).
  address: { 
    type: String, 
    trim: true,
    required: function() { return this.type === 'RESIDENTIAL'; }
  },
  // Plano de assinatura contratado pela empresa (ex: Básico, Profissional), controla o acesso a funcionalidades.
  plan: { type: String, enum: ["BASIC", "PRO", "PREMIUM"], default: "BASIC" },
  // Flag para "soft delete". Se `false`, a empresa é considerada inativa e seus usuários não podem mais logar.
  isActive: { type: Boolean, default: true },
  // Data em que a empresa foi registrada no sistema, preenchida automaticamente.
}, {
  // Adiciona os campos `createdAt` e `updatedAt` automaticamente.
  timestamps: true
});

// Índices para otimizar consultas.
// Um índice no nome para buscas e ordenações rápidas.
CompanySchema.index({ name: 1 });

export default mongoose.models.Company || model("Company", CompanySchema);
