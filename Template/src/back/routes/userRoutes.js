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
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";

const router = express.Router();

// Rota para que o usuário autenticado altere sua própria senha.
// PUT /api/users/profile/change-password
router.put("/profile/change-password", authMiddleware, auditMiddleware("CHANGE_PASSWORD"), changePassword);

// Rotas para o perfil do usuário logado (/api/users/me)
router.route("/me")
  .get(authMiddleware, getProfile) // GET /api/users/me - Consulta o próprio perfil
  .put(authMiddleware, auditMiddleware("UPDATE_USER"), updateUser); // PUT /api/users/me - Atualiza o próprio perfil

export default router;
