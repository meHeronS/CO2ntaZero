
import express from "express";
import {
  getAllAlerts,
  getAlertById,
  createAlert,
  markAsRead,
  deleteAlert,
} from "../controllers/alertController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { companyScopeMiddleware } from "../middlewares/companyScopeMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";

const router = express.Router();

// Listar alertas
router.get("/", authMiddleware, getAllAlerts);

// Obter alerta específico
router.get("/:id", authMiddleware, companyScopeMiddleware, getAlertById);

// Criar alerta
router.post("/", authMiddleware, auditMiddleware("CREATE_ALERT"), createAlert);

// Marcar como lido
router.patch("/:id/read", authMiddleware, companyScopeMiddleware, auditMiddleware("READ_ALERT"), markAsRead);

// Deletar alerta
router.delete("/:id", authMiddleware, companyScopeMiddleware, auditMiddleware("DELETE_ALERT"), deleteAlert);

export default router;
