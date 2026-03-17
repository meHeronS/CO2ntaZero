// =================================================================================
// ARQUIVO: routes/logRoutes.js
// DESCRIÇÃO: Define as rotas para consulta dos logs de auditoria do sistema.
//            O acesso é restrito ao proprietário dos dados.
// =================================================================================

import express from "express";
import { getAllLogs, getLogsByUser } from "../controllers/logController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para listar todos os logs do sistema, com suporte a filtros.
// O controller já filtra pela companyId do usuário.
// GET /api/logs
router.get("/", authMiddleware, getAllLogs);

// Rota para listar todos os logs de um usuário específico.
// O controller já filtra pela companyId do usuário.
// GET /api/logs/user/:userId
router.get("/user/:userId", authMiddleware, getLogsByUser);

export default router;
