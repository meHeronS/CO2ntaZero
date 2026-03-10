
import express from "express";
import {
  createConsumption,
  getAllConsumptions,
  updateConsumption,
  getConsumptionById,
  deleteConsumption
} from "../controllers/consumptionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";

const router = express.Router();

// Listar todos os consumos (com filtros opcionais via query)
router.get("/", authMiddleware, getAllConsumptions);

// Obter um consumo específico
router.get("/:id", authMiddleware, getConsumptionById);

// Criar um novo registro de consumo (gera log de auditoria e pode disparar alertas)
router.post("/", authMiddleware, auditMiddleware("CREATE_CONSUMPTION"), createConsumption);

// Atualizar consumo existente
router.put("/:id", authMiddleware, auditMiddleware("UPDATE_CONSUMPTION"), updateConsumption);

// Remover consumo
router.delete("/:id", authMiddleware, auditMiddleware("DELETE_CONSUMPTION"), deleteConsumption);

export default router;
