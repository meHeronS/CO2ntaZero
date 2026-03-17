
import mongoose from "mongoose";
import Waste from "../models/Waste.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";
import { createLog } from "../utils/logger.js";
// Futuramente, pode importar calculateCarbonFootprint para calcular emissões evitadas (crédito)
// import { calculateEmissionCredit } from "../services/CarbonCalculatorService.js";

/**
 * Controller de Gestão de Resíduos (Waste Management)
 * Responsável pelo CRUD de descartes e registros de resíduos gerados.
 * Integra-se ao módulo de pegada de carbono para potencial cálculo de emissões evitadas.
 */

// Listar resíduos da empresa com paginação e filtros
export const getWastes = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, startDate, endDate } = req.query;
        const query = { companyId: req.user.companyId };

        // Filtros opcionais
        if (type) query.type = type;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const wastes = await Waste.find(query)
            .sort({ date: -1 })
            .limit(Number(limit))
            .skip((page - 1) * limit)
            .populate('userId', 'name email'); // Popula dados do usuário responsável

        const total = await Waste.countDocuments(query);

        return successResponse(res, {
            data: wastes,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao listar resíduos", errors: error.message });
    }
};

// Registrar novo descarte (RF-04: Gestão de Resíduos)
export const createWaste = async (req, res) => {
    try {
        const { type, quantity, unit, description, destination, disposalMethod, date } = req.body;
        const companyId = req.user.companyId;

        // Validação básica dos campos obrigatórios
        // Nota: O modelo Mongoose já valida, mas uma pré-validação retorna erro 400 mais limpo
        if (!type || !quantity || !unit || !disposalMethod) {
            return errorResponse(res, { status: 400, message: "Campos obrigatórios: type, quantity, unit, disposalMethod" });
        }

        // TODO: Implementar lógica de cálculo de "Carbono Evitado" caso o resíduo seja reciclado
        // Ex: const carbonSaved = await calculateEmissionCredit(type, quantity, unit);
        
        const waste = await Waste.create({
            companyId,
            userId: req.user.userId, // Obtido do token JWT
            type,
            quantity, // amount -> quantity (padronização com Consumption)
            unit,
            description,
            destination,
            disposalMethod,
            date: date || new Date()
        });

        // Registro de Auditoria
        await createLog({
            userId: req.user.userId,
            companyId,
            action: "CREATE_WASTE",
            description: `Registrado descarte de ${quantity} ${unit} de ${type} via ${disposalMethod}`,
            route: req.originalUrl,
            resourceId: waste._id
        });

        return successResponse(res, { status: 201, data: waste });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao registrar resíduo", errors: error.message });
    }
};

// Obter detalhes de um registro específico
export const getWasteById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID inválido" });

        const waste = await Waste.findOne({ _id: id, companyId: req.user.companyId });
        
        if (!waste) {
            return errorResponse(res, { status: 404, message: "Registro de resíduo não encontrado" });
        }
        
        return successResponse(res, { data: waste });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao buscar resíduo", errors: error.message });
    }
};

// Atualizar registro de resíduo
export const updateWaste = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const companyId = req.user.companyId;

        const updatedWaste = await Waste.findOneAndUpdate(
            { _id: id, companyId },
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedWaste) {
            return errorResponse(res, { status: 404, message: "Registro de resíduo não encontrado para atualização" });
        }

        await createLog({
            userId: req.user.userId,
            companyId,
            action: "UPDATE_WASTE",
            description: `Atualizado registro de resíduo ${id}`,
            route: req.originalUrl,
            resourceId: id
        });

        return successResponse(res, { data: updatedWaste });
    } catch (error) {
         return errorResponse(res, { status: 500, message: "Erro ao atualizar resíduo", errors: error.message });
    }
};

// Excluir registro de resíduo
export const deleteWaste = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.user.companyId;

        const deleted = await Waste.findOneAndDelete({ _id: id, companyId });
        
        if (!deleted) {
            return errorResponse(res, { status: 404, message: "Registro de resíduo não encontrado" });
        }

        await createLog({
            userId: req.user.userId,
            companyId,
            action: "DELETE_WASTE",
            description: `Excluído registro de resíduo ${id}`,
            route: req.originalUrl,
            resourceId: id
        });

        return successResponse(res, { message: "Registro excluído com sucesso" });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao excluir resíduo", errors: error.message });
    }
};
