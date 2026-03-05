import express from "express";
import { 
  getAllFactors, 
  createFactor, 
  updateFactor, 
  deleteFactor, 
  getFactorById 
} from "../controllers/emissionFactorController.js";
import { authMiddleware as protect } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Rotas públicas (ou protegidas apenas para leitura)
router.get("/", protect, getAllFactors);
router.get("/:id", protect, getFactorById);

// Rotas protegidas (apenas ADMIN ou ROOT deveriam alterar fatores globais)
// Vamos assumir que apenas 'ROOT' ou um 'ADMIN_GLOBAL' poderia mexer nisso. 
// Como ainda não temos ADMIN_GLOBAL, usaremos authorize('ROOT').
router.post("/", protect, roleMiddleware(["ROOT"]), createFactor); 
router.put("/:id", protect, roleMiddleware(["ROOT"]), updateFactor);
router.delete("/:id", protect, roleMiddleware(["ROOT"]), deleteFactor);

export default router;
