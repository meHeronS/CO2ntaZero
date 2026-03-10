import Company from "../models/Company.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { successResponse, errorResponse } from '../utils/responseHelper.js';

/**
 * @desc    Criar uma nova empresa.
 * @route   POST /api/companies
 * @access  Private
 * @note    Verifica se já existe uma empresa com o mesmo CNPJ para evitar duplicatas.
 */
export const createCompany = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { name, cnpj, email, phone, address, plan, type } = req.body; // Padronizado para 'email'

    // Validação Específica por Tipo (Consistente com authController)
    if (type === 'BUSINESS') {
      if (!cnpj || !email) throw new Error("Para empresas, CNPJ e E-mail corporativo são obrigatórios.");
      
      // Verifica duplicidade apenas se for empresa
      const existingCompany = await Company.findOne({ $or: [{ cnpj }, { email }] }).session(session);
      if (existingCompany) {
        throw new Error("CNPJ ou E-mail corporativo já cadastrado no sistema.");
      }
    } else if (type === 'RESIDENTIAL') {
      if (!address) throw new Error("Para residências, o endereço é obrigatório.");
    }

    // Cria a nova empresa com os dados fornecidos e define valores padrão.
    // O plano 'BASIC' é atribuído se nenhum plano for especificado.
    const newCompany = new Company({
      name, cnpj, email, phone, address,
      type: type || "BUSINESS",
      isActive: true,
      plan: plan || "BASIC",
      ownerId: req.user.userId // O usuário logado é o dono
    });
    await newCompany.save({ session });

    // Atualiza o usuário para incluir a nova empresa na sua lista
    await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { companies: newCompany._id } }, // $addToSet evita duplicatas
      { session }
    );

    await session.commitTransaction();

    // Retorna uma resposta de sucesso (201 Created) com os dados da nova empresa.
    return successResponse(res, { status: 201, message: "Empresa criada com sucesso.", data: newCompany });
  } catch (error) {
    await session.abortTransaction();
    return errorResponse(res, { status: 500, message: error.message || "Erro interno ao criar empresa.", errors: error });
  } finally {
    session.endSession();
  }
};

export const getCompanies = async (req, res) => {
  try {
    // Retorna apenas as empresas vinculadas ao usuário logado (via array companies ou ownerId)
    // Como o User model tem o array 'companies', podemos buscar as empresas cujos IDs estão lá,
    // ou buscar onde ownerId == req.user.userId.
    // Vamos buscar onde o usuário é dono.
    const items = await Company.find({ ownerId: req.user.userId });
    return successResponse(res, { data: items });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro interno ao buscar empresas.", errors: error });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    // Busca pelo ID e garante que o usuário logado é o dono
    const company = await Company.findOne({ _id: req.params.id, ownerId: req.user.userId });
    // Se nenhuma empresa for encontrada com o ID fornecido, retorna um erro 404.
    if (!company) {
      return errorResponse(res, { status: 404, message: "Empresa não encontrada" });
    }
    return successResponse(res, { data: company });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao buscar empresa", errors: error });
  }
};

export const updateCompany = async (req, res) => {
  try {
    // Encontra a empresa pelo ID e OwnerID e atualiza com os dados do req.body.
    // A opção { new: true } garante que o documento retornado seja a versão atualizada.
    const updated = await Company.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.userId }, 
      req.body, { 
      new: true,
    });

    if (!updated) {
      // Se a empresa não for encontrada para atualização, retorna 404.
      return errorResponse(res, { status: 404, message: "Empresa não encontrada" });
    }

    return successResponse(res, { message: "Empresa atualizada com sucesso.", data: updated });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao atualizar empresa", errors: error });
  }
};

export const deactivateCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id, ownerId: req.user.userId });
    // Se a empresa não for encontrada, retorna 404.
    if (!company) {
      return errorResponse(res, { status: 404, message: "Empresa não encontrada" });
    }

    // Altera o status da empresa para inativo e salva a alteração.
    company.isActive = false;
    await company.save();

    return successResponse(res, { message: "Empresa desativada com sucesso" });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao desativar empresa", errors: error });
  }
};
