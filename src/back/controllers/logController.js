
import Logs from "../models/Logs.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

/**
 * @desc    Listar logs de auditoria (com filtros).
 * @route   GET /api/logs
 * @access  Private (ROOT ou ADMIN_COMPANY)
 */
export const getAllLogs = async (req, res) => {
  try {
    // Permite apenas ROOT ou ADMIN_COMPANY
    const userRole = req.user.role;
    if (!["ROOT", "ADMIN_COMPANY"].includes(userRole)) {
        return errorResponse(res, { status: 403, message: "Acesso negado." });
    }

    const filter = {};
    // Se não for ROOT, restringe à empresa do usuário
    if (userRole !== "ROOT") {
        filter.companyId = req.user.companyId;
    } else {
        // Se for ROOT e passar companyId no query, usa o filtro
        if (req.query.companyId) filter.companyId = req.query.companyId;
    }

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
    const userRole = req.user.role;
    const userCompanyId = req.user.companyId;

    // Regra de acesso:
    // 1. ROOT pode ver de qualquer um.
    // 2. ADMIN_COMPANY pode ver de usuários da SUA empresa (Assumindo que o frontend/backend validam se o targetUser pertence à mesma empresa, 
    //    mas aqui filtramos logs pelo userId. Se o userId for de outra empresa, o ADMIN não deveria saber, mas se souber o ID, teoricamente conseguiria ver.
    //    Para segurança total, deveríamos buscar o usuário alvo e checar a empresa. 
    //    Como simplificação aqui: permitimos se for o próprio usuário ou ROOT.
    //    Para ADMIN: Melhor prática seria checar o companyId nos logs também.)
    
    // Simplificação segura:
    // Se não for ROOT e não for o próprio dono dos logs...
    if (userRole !== "ROOT" && req.user.userId.toString() !== targetUserId) {
        // ... verificamos se é ADMIN_COMPANY
        if (userRole === "ADMIN_COMPANY") {
            // ADMIN pode ver logs, mas idealmente precisamos garantir que os logs retornados sejam da empresa dele.
            // O filtro abaixo garante isso.
        } else {
             return errorResponse(res, { status: 403, message: "Acesso negado." });
        }
    }

    const filter = { userId: targetUserId };
    if (userRole !== "ROOT") {
        filter.companyId = userCompanyId; // Garante que só retorna logs da empresa do solicitante
    }

    const items = await Logs.find(filter).sort({ createdAt: -1 }).limit(500);
    return successResponse(res, { data: items });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar logs por usuário.", errors: error });
  }
};

