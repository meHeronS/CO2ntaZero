import express from "express";
import { 
  getAllFactors, 
  createFactor, 
  updateFactor, 
  deleteFactor, 
  getFactorById 
} from "../controllers/emissionFactorController.js";
import { authMiddleware as protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas públicas (ou protegidas apenas para leitura)
router.get("/", protect, getAllFactors);
router.get("/:id", protect, getFactorById);

// Rotas protegidas (apenas ADMIN ou ROOT deveriam alterar fatores globais)
// Vamos assumir que apenas 'ROOT' ou um 'ADMIN_GLOBAL' poderia mexer nisso. 
// Como ainda não temos ADMIN_GLOBAL, usaremos authorize('ROOT') ou deixaremos sem restrição de role por enquanto se não houver usuario ROOT padrão.
// Para facilitar o teste, deixarei protect, mas a logica de negócio real exigiria um super-admin.
router.post("/", protect, createFactor); 
router.put("/:id", protect, updateFactor);
router.delete("/:id", protect, deleteFactor);

export default router;
