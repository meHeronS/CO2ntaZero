
import Goal from "../models/Goal.js";
import mongoose from "mongoose";
import { createLog } from "../utils/logger.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

/**
 * @desc    Listar todas as metas de sustentabilidade da empresa.
 * @route   GET /api/goals
 * @access  Private
 */
export const getGoals = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const items = await Goal.find({ companyId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Goal.countDocuments({ companyId });

    return successResponse(res, { data: items, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar metas de sustentabilidade", errors: error });
  }
};

/**
 * @desc    Obter uma meta de sustentabilidade específica por ID.
 * @route   GET /api/goals/:id
 * @access  Private
 */
export const getGoalById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return errorResponse(res, { status: 404, message: "Meta não encontrada" });

        const companyId = req.user.companyId;
        const goal = await Goal.findOne({ _id: req.params.id, companyId });

        if (!goal) {
            return errorResponse(res, { status: 404, message: "Meta não encontrada" });
        }
        return successResponse(res, { data: goal });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao buscar meta", errors: error });
    }
};

/**
 * @desc    Criar uma nova meta de redução de consumo/emissão.
 * @route   POST /api/goals
 * @access  Private
 */
export const createGoal = async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const { title, resourceType, targetReductionPercentage, baselineConsumption, startDate, deadline } = req.body;

        const newGoal = await Goal.create({
            companyId,
            userId: req.user.userId,
            title,
            resourceType,
            targetReductionPercentage,
            baselineConsumption,
            startDate,
            deadline,
            status: "active"
        });

        await createLog({
            userId: req.user.userId,
            companyId,
            action: "CREATE_GOAL",
            description: `Meta criada: ${title} (${resourceType}) - Alterar em ${targetReductionPercentage}%`,
            route: req.originalUrl
        });

        return successResponse(res, { status: 201, data: newGoal });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao criar meta", errors: error });
    }
};

/**
 * @desc    Atualizar uma meta existente.
 * @route   PUT /api/goals/:id
 * @access  Private
 */
export const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID de meta inválido." });

        const companyId = req.user.companyId;
        
        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: id, companyId },
            req.body,
            { new: true }
        );

        if (!updatedGoal) return errorResponse(res, { status: 404, message: "Meta não encontrada" });

        await createLog({
            userId: req.user.userId,
            companyId,
            action: "UPDATE_GOAL",
            description: `Meta atualizada: ${id}`,
            route: req.originalUrl
        });

        return successResponse(res, { data: updatedGoal });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao atualizar meta", errors: error });
    }
};

/**
 * @desc    Remover uma meta.
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
export const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID de meta inválido." });

        const companyId = req.user.companyId;

        const deletedGoal = await Goal.findOneAndDelete({ _id: id, companyId });

        if (!deletedGoal) return errorResponse(res, { status: 404, message: "Meta não encontrada" });

        await createLog({
            userId: req.user.userId,
            companyId,
            action: "DELETE_GOAL",
            description: `Meta removida: ${id}`,
            route: req.originalUrl
        });

        return successResponse(res, { message: "Meta removida com sucesso" });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao remover meta", errors: error });
    }
};
