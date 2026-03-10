import EmissionFactor from "../models/EmissionFactor.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

// Listar todos os fatores de emissão
export const getAllFactors = async (req, res) => {
  try {
    // Pode filtrar por ano se passar ?year=2024
    const filter = {};
    if (req.query.year) filter.referenceYear = req.query.year;

    const factors = await EmissionFactor.find(filter).sort({ source: 1, referenceYear: -1 });
    return successResponse(res, { data: factors });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao listar fatores de emissão", errors: error });
  }
};

// Obter um fator específico pelo ID
export const getFactorById = async (req, res) => {
  try {
    const factor = await EmissionFactor.findById(req.params.id);
    if (!factor) return errorResponse(res, { status: 404, message: "Fator de emissão não encontrado" });
    return successResponse(res, { data: factor });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro ao buscar fator", errors: error });
  }
};
