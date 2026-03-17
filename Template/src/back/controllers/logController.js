
import Logs from "../models/Logs.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

/**
 * @desc    Listar logs de auditoria (com filtros).
 * @route   GET /api/logs
 * @access  Private
 */
export const getAllLogs = async (req, res) => {
  try {
    // Filtra estritamente pela empresa do usuário logado
    const filter = { companyId: req.user.companyId };

    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.action) filter.action = req.query.action;

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 500);
    const skip = (page - 1) * limit;

    const items = await Logs.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Logs.countDocuments(filter);

    return successResponse(res, { data: { total, page, limit, items } });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar logs.", errors: error });
  }
};

/**
 * @desc    Listar logs de um usuário específico.
 * @route   GET /api/logs/user/:userId
 * @access  Private
 */
export const getLogsByUser = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const userCompanyId = req.user.companyId;

    const filter = { 
      userId: targetUserId,
      companyId: userCompanyId // Garante que só retorna logs da empresa do solicitante
    };

    const items = await Logs.find(filter).sort({ createdAt: -1 }).limit(500);
    return successResponse(res, { data: items });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar logs por usuário.", errors: error });
  }
};
