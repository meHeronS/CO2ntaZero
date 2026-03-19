
import mongoose from "mongoose";
import Alert from "../models/Alert.js";
import { createLog } from "../utils/logger.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

/**
 * @desc    Listar alertas da empresa.
 * @route   GET /api/alerts
 * @access  Private
 */
export const getAllAlerts = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { limit = 20, page = 1, read } = req.query;
    
    const filter = { companyId };
    if (read !== undefined) filter.read = read === "true";

    const skip = (Number(page) - 1) * Number(limit);

    const items = await Alert.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const total = await Alert.countDocuments(filter);

    return successResponse(res, { data: items, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar alertas.", errors: error });
  }
};

/**
 * @desc    Obter alerta por ID.
 * @route   GET /api/alerts/:id
 * @access  Private
 */
export const getAlertById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID de alerta inválido." });

    const companyId = req.user.companyId;

    const alert = await Alert.findOne({ _id: id, companyId });
    if (!alert) return errorResponse(res, { status: 404, message: "Alerta não encontrado." });

    return successResponse(res, { data: alert });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao obter alerta.", errors: error });
  }
};

/**
 * @desc    Criar alerta manualmente (Sistema).
 * @route   POST /api/alerts
 * @access  Private
 */
export const createAlert = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { message, type, goalId, consumptionId } = req.body;

    const newAlert = await Alert.create({
      companyId,
      userId: req.user.userId,
      message,
      type,
      goalId, 
      consumptionId,
      read: false
    });

    await createLog({
      userId: req.user.userId,
      companyId,
      action: "CREATE_ALERT",
      description: `Alerta criado: ${type}`,
      route: req.originalUrl
    });

    return successResponse(res, { status: 201, data: newAlert });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao criar alerta.", errors: error });
  }
};

/**
 * @desc    Marcar alerta como lido.
 * @route   PATCH /api/alerts/:id/read
 * @access  Private
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID de alerta inválido." });

    const companyId = req.user.companyId;

    const updated = await Alert.findOneAndUpdate(
      { _id: id, companyId },
      { read: true },
      { new: true }
    );

    if (!updated) return errorResponse(res, { status: 404, message: "Alerta não encontrado." });

    return successResponse(res, { data: updated });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao atualizar alerta.", errors: error });
  }
};

/**
 * @desc    Remover alerta.
 * @route   DELETE /api/alerts/:id
 * @access  Private
 */
export const deleteAlert = async (req, res) => {
  try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID de alerta inválido." });

      const companyId = req.user.companyId;

      const deleted = await Alert.findOneAndDelete({ _id: id, companyId });
      if (!deleted) return errorResponse(res, { status: 404, message: "Alerta não encontrado" });

      return successResponse(res, { message: "Alerta removido." });
  } catch (error) {
      return errorResponse(res, { status: 500, message: "Erro ao remover alerta", errors: error });
  }
};
