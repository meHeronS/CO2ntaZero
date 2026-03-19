// =================================================================================
// ARQUIVO: routes/companyRoutes.js
// DESCRIÇÃO: Define as rotas para o gerenciamento de Empresas.
//            O acesso é restrito ao proprietário da empresa.
// =================================================================================

import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deactivateCompany,
} from "../controllers/companyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";
import { validate } from "../validators/validationMiddleware.js";
import { createCompanySchema, updateCompanySchema } from "../validators/companyValidation.js";

const router = express.Router();

// Rota para cadastrar uma nova empresa.
// POST /api/companies
router.post("/", authMiddleware, validate(createCompanySchema), auditMiddleware("CREATE_COMPANY"), createCompany);

// Rota para listar todas as empresas vinculadas ao usuário.
// GET /api/companies
router.get("/", authMiddleware, getCompanies);

// Rota para buscar uma empresa específica por ID.
// Acesso permitido a qualquer usuário autenticado para buscar sua própria empresa, por exemplo.
// GET /api/companies/:id
router.get("/:id", authMiddleware, getCompanyById);

// Rota para atualizar os dados de uma empresa.
// PUT /api/companies/:id
router.put("/:id", authMiddleware, validate(updateCompanySchema), auditMiddleware("UPDATE_COMPANY"), updateCompany);

// Rota para desativar uma empresa (soft delete).
// PATCH /api/companies/:id/deactivate
router.patch("/:id/deactivate", authMiddleware, auditMiddleware("DEACTIVATE_COMPANY"), deactivateCompany);

export default router;
