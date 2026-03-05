
import express from "express";
import { getEmissionsReport } from "../controllers/reportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para obter relatório de emissões (resumo JSON)
router.get("/emissions", authMiddleware, getEmissionsReport);

export default router;

