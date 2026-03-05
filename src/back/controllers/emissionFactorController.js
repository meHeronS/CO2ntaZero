import EmissionFactor from "../models/EmissionFactor.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

// Listar todos os fatores de emissão
export const getAllFactors = async (req, res) => {
  try {
    // Pode filtrar por ano se passar ?year=2024
    const filter = {};
    if (req.query.year) filter.referenceYear = req.query.year;

    const factors = await EmissionFactor.find(filter).sort({ source: 1, referenceYear: -1 });
    return successResponse(res, factors);
  } catch (error) {
    return errorResponse(res, 500, "Erro ao listar fatores de emissão", error);
  }
};

// Obter um fator específico pelo ID
export const getFactorById = async (req, res) => {
  try {
    const factor = await EmissionFactor.findById(req.params.id);
    if (!factor) return errorResponse(res, 404, "Fator de emissão não encontrado");
    return successResponse(res, factor);
  } catch (error) {
    return errorResponse(res, 500, "Erro ao buscar fator", error);
  }
};

// Criar novo fator de emissão (Apenas Admin Global deveria fazer isso, mas por enquanto deixaremos aberto ou protegido pela rota)
export const createFactor = async (req, res) => {
  try {
    const { source, factor, unit, referenceYear, sourceReference } = req.body;

    // Verificação simples se já existe para aquele ano e fonte
    const existing = await EmissionFactor.findOne({ source, referenceYear });
    if (existing) {
      return errorResponse(res, 400, `Já existe um fator para ${source} no ano ${referenceYear}`);
    }

    const newFactor = await EmissionFactor.create({
      source,
      factor,
      unit,
      referenceYear,
      sourceReference
    });

    return successResponse(res, newFactor, 201);
  } catch (error) {
    return errorResponse(res, 500, "Erro ao criar fator de emissão", error);
  }
};

// Atualizar fator
export const updateFactor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFactor = await EmissionFactor.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedFactor) return errorResponse(res, 404, "Fator não encontrado para atualização");

    return successResponse(res, updatedFactor);
  } catch (error) {
    return errorResponse(res, 500, "Erro ao atualizar fator", error);
  }
};

// Remover fator
export const deleteFactor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EmissionFactor.findByIdAndDelete(id);
    
    if (!deleted) return errorResponse(res, 404, "Fator não encontrado para exclusão");

    return successResponse(res, { message: "Fator de emissão removido com sucesso" });
  } catch (error) {
    return errorResponse(res, 500, "Erro ao remover fator", error);
  }
};
