import mongoose from "mongoose";
import Consumption from "../models/Consumption.js";
import { calculateCarbonFootprint } from "../services/CarbonCalculatorService.js";
import Alert from "../models/Alert.js";
import { createLog } from "../utils/logger.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

/**
 * Motor de Anomalias Simplificado
 * Regra de Negócio: Variação de 15% acima da média histórica de 3 meses.
 */
const checkAnomaly = async (companyId, resourceType, currentQuantity, consumptionId, userId) => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const stats = await Consumption.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
          resourceType: resourceType,
          date: { $gte: threeMonthsAgo },
        }
      },
      {
        $group: {
          _id: null,
          avgQuantity: { $avg: "$quantity" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0 && stats[0].count >= 3) {
      const average = stats[0].avgQuantity;
      
      // Regra de 15% (Threshold Scope Definition)
      if (currentQuantity > average * 1.15) {
        await Alert.create({
          companyId,
          userId,
          type: "anomaly_detected",
          message: `Alerta de Anomalia: Consumo de ${resourceType} (${currentQuantity}) excede a média histórica (${average.toFixed(2)}) em mais de 15%.`,
          read: false,
          severity: "high",
          createdAt: new Date(),
          metadata: {
            consumptionId: consumptionId,
            averageHistory: average,
            threshold: "15%"
          }
        });
      }
    }
  } catch (err) {
    console.error("Erro no Motor de Anomalias:", err);
  }
};

export const getAllConsumptions = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { start, end, resourceType } = req.query;
    const filter = { companyId };

    if (start || end) {
      filter.date = {};
      if (start) filter.date.$gte = new Date(start);
      if (end) filter.date.$lte = new Date(end);
    }
    if (resourceType) filter.resourceType = resourceType;

    const items = await Consumption.find(filter).sort({ date: -1 });
    return successResponse(res, { data: items });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar consumos", errors: error.message });
  }
};

export const getConsumptionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, { status: 400, message: "ID inválido" });

    const item = await Consumption.findOne({ _id: id, companyId: req.user.companyId });
    if (!item) return errorResponse(res, { status: 404, message: "Consumo não encontrado" });

    return successResponse(res, { data: item });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao buscar consumo", errors: error.message });
  }
};

export const createConsumption = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { resourceType, quantity, unit, date, notes, cost } = req.body;

    // 1. Calcular Pegada de Carbono (Via Service)
    const carbonFootprint = await calculateCarbonFootprint(resourceType, quantity, unit);

    // 2. Criar Registro
    const newConsumption = await Consumption.create({
      companyId,
      userId: req.user.userId,
      resourceType,
      quantity,
      unit,
      cost,
      date: date || new Date(),
      carbonFootprint,
      notes
    });

    // 3. Auditoria
    await createLog({
      userId: req.user.userId,
      companyId,
      action: "CREATE_CONSUMPTION",
      description: `Criado consumo de ${quantity} ${unit} de ${resourceType}. Pegada: ${carbonFootprint.toFixed(2)} kgCO2e`,
      route: req.originalUrl,
      resourceId: newConsumption._id
    });

    // 4. Motor de Anomalias
    // Parâmetros: companyId, resourceType, currentQuantity, consumptionId, userId
    checkAnomaly(companyId, resourceType, quantity, newConsumption._id, req.user.userId);

    return successResponse(res, { status: 201, data: newConsumption });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao criar consumo", errors: error.message });
  }
};

export const updateConsumption = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;
    const updates = req.body;

    // Se atualizar quantidade ou tipo, recalcula pegada
    if (updates.quantity || updates.resourceType) {
        const original = await Consumption.findOne({ _id: id, companyId });
        if(!original) return errorResponse(res, { status: 404, message: "Consumo não encontrado" });
        
        const rType = updates.resourceType || original.resourceType;
        const qty = updates.quantity !== undefined ? updates.quantity : original.quantity;
        const unt = updates.unit || original.unit;

        updates.carbonFootprint = await calculateCarbonFootprint(rType, qty, unt);
    }

    const updated = await Consumption.findOneAndUpdate(
      { _id: id, companyId },
      updates,
      { new: true }
    );

    if (!updated) return errorResponse(res, { status: 404, message: "Consumo não encontrado" });
    
    await createLog({
      userId: req.user.userId,
      companyId,
      action: "UPDATE_CONSUMPTION",
      description: `Atualizado consumo ${id}`,
      route: req.originalUrl,
      resourceId: id
    });

    return successResponse(res, { data: updated });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao atualizar consumo", errors: error.message });
  }
};

export const deleteConsumption = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    const deleted = await Consumption.findOneAndDelete({ _id: id, companyId });
    if (!deleted) return errorResponse(res, { status: 404, message: "Consumo não encontrado" });

    await createLog({
      userId: req.user.userId,
      companyId,
      action: "DELETE_CONSUMPTION",
      description: `Deletado (hard delete) consumo ${id}`,
      route: req.originalUrl,
      resourceId: id
    });

    return successResponse(res, { message: "Removido com sucesso" });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao deletar consumo", errors: error.message });
  }
};
