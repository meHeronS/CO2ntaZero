import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createLog } from "../utils/logger.js";
import mongoose from 'mongoose';
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash"); // userId já é ObjectId do authMiddleware
    if (!user) return errorResponse(res, { status: 404, message: "Usuário não encontrado." });
    return successResponse(res, { data: user });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao buscar perfil.", errors: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const updated = await User.findOneAndUpdate(
      { _id: req.user.userId }, // Atualiza diretamente o usuário logado
      { $set: updateData },
      { new: true }
    ).select("-passwordHash");

    if (!updated) return errorResponse(res, { status: 404, message: "Usuário não encontrado." });

    await createLog({
      userId: req.user.userId,
      companyId: req.user.companyId,
      action: "UPDATE_USER",
      description: `User atualizado: ${updated.email}`,
      route: req.originalUrl,
    });

    return successResponse(res, { data: updated });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao atualizar usuário.", errors: error });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; // userId já é ObjectId do authMiddleware
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return errorResponse(res, { status: 400, message: "Senha antiga e nova senha são obrigatórias." });

    const user = await User.findById(userId).select("+passwordHash");
    if (!user) return errorResponse(res, { status: 404, message: "Usuário não encontrado" });

    const match = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!match) return errorResponse(res, { status: 401, message: "Senha antiga incorreta" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    await createLog({
      userId,
      companyId: req.user.companyId,
      action: "CHANGE_PASSWORD",
      description: "Senha alterada",
      route: req.originalUrl,
    });

    return successResponse(res, { message: "Senha alterada com sucesso" });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao alterar senha.", errors: error });
  }
};
