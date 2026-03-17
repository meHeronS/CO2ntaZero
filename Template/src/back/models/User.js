// =================================================================================
// ARQUIVO: models/User.js
// DESCRIÇÃO: Define o Schema para a coleção 'Users' no MongoDB.
//            Este modelo representa cada usuário individual do sistema, contendo
//            suas credenciais de acesso e informações de perfil.
// =================================================================================

import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    // Empresa Ativa: Define qual contexto o usuário está visualizando no momento.
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true, // Indexar este campo acelera a busca de todos os usuários de uma empresa.
    },
    // Lista de todas as unidades (Empresas/Residências) que este usuário (CPF) gerencia.
    companies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }],
    // Nome completo do usuário.
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // CPF do usuário (Pessoa Física). Obrigatório para todos os usuários do sistema.
    cpf: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // E-mail de login do usuário. Deve ser único em todo o sistema.
    email: {
      type: String,
      required: true,
      unique: true, // Garante que não existam dois usuários com o mesmo e-mail.
      lowercase: true,
      trim: true,
    },
    // Armazena o hash da senha, nunca a senha em texto plano. `select: false` impede que este campo seja retornado em consultas por padrão.
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    // Hash do token temporário gerado para o fluxo de recuperação de senha.
    passwordResetToken: {
      type: String,
      select: false,
    },
    // Data de expiração do token de recuperação de senha.
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    // Flag para "soft delete". Se `false`, o usuário é considerado inativo e não pode logar.
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adiciona `createdAt` e `updatedAt` automaticamente.
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
