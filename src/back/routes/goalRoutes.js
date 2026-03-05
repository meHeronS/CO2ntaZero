
import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  getGoalById,
  deleteGoal,
} from "../controllers/goalController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { companyScopeMiddleware } from "../middlewares/companyScopeMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";

const router = express.Router();

// Rota para listar todas as metas de sustentabilidade da empresa.
router.get("/", authMiddleware, getGoals);

// Rota para obter uma meta específica.
router.get("/:id", authMiddleware, companyScopeMiddleware, getGoalById);

// Rota para criar uma nova meta.
router.post("/", authMiddleware, auditMiddleware("CREATE_GOAL"), createGoal);

// Rota para atualizar uma meta existente.
router.put("/:id", authMiddleware, companyScopeMiddleware, auditMiddleware("UPDATE_GOAL"), updateGoal);

// Rota para remover uma meta.
router.delete("/:id", authMiddleware, companyScopeMiddleware, auditMiddleware("DELETE_GOAL"), deleteGoal);

export default router;
