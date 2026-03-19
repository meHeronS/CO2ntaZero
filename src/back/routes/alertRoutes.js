
import express from "express";
import {
  getAllAlerts,
  getAlertById,
  createAlert,
  markAsRead,
  deleteAlert,
} from "../controllers/alertController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";
import { validate } from "../validators/validationMiddleware.js";
import { createAlertSchema } from "../validators/alertValidation.js";

const router = express.Router();

// Listar alertas
router.get("/", authMiddleware, getAllAlerts);

// Obter alerta específico
router.get("/:id", authMiddleware, getAlertById);

// Criar alerta
router.post("/", authMiddleware, validate(createAlertSchema), auditMiddleware("CREATE_ALERT"), createAlert);

// Marcar como lido
router.patch("/:id/read", authMiddleware, auditMiddleware("READ_ALERT"), markAsRead);

// Deletar alerta
router.delete("/:id", authMiddleware, auditMiddleware("DELETE_ALERT"), deleteAlert);

export default router;
