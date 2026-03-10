import express from "express";
import { 
  getAllFactors, 
  getFactorById 
} from "../controllers/emissionFactorController.js";
import { authMiddleware as protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas de Leitura (O usuário apenas consulta a lista para selecionar no frontend)
router.get("/", protect, getAllFactors);
router.get("/:id", protect, getFactorById);

export default router;
