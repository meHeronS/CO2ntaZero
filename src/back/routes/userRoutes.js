// =================================================================================
// ARQUIVO: routes/userRoutes.js
// DESCRIÇÃO: Define as rotas para o gerenciamento de Usuários, incluindo
//            CRUD e consulta de perfil.
// =================================================================================

import express from "express";
import {
  updateUser,
  getProfile,
  changePassword,
  switchActiveCompany
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";
import { validate } from "../validators/validationMiddleware.js";
import { updateUserSchema, changePasswordSchema, switchCompanySchema } from "../validators/userValidation.js";

const router = express.Router();

// Rota para que o usuário autenticado altere sua própria senha.
// PUT /api/users/profile/change-password
router.put("/profile/change-password", authMiddleware, validate(changePasswordSchema), auditMiddleware("CHANGE_PASSWORD"), changePassword);

// Rota para alternar entre as unidades/empresas do usuário (Ex: Casa -> Bar)
// PATCH /api/users/me/switch-company
router.patch("/me/switch-company", authMiddleware, validate(switchCompanySchema), auditMiddleware("SWITCH_COMPANY"), switchActiveCompany);

// Rotas para o perfil do usuário logado (/api/users/me)
router.route("/me")
  .get(authMiddleware, getProfile) // GET /api/users/me - Consulta o próprio perfil
  .put(authMiddleware, validate(updateUserSchema), auditMiddleware("UPDATE_USER"), updateUser); // PUT /api/users/me - Atualiza o próprio perfil

export default router;
