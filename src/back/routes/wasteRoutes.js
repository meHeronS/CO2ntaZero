
import express from 'express';
import { authMiddleware as protect } from '../middlewares/authMiddleware.js';
import { 
    getWastes, 
    createWaste, 
    getWasteById,
    updateWaste,
    deleteWaste 
} from '../controllers/wasteController.js';
import { validate } from "../validators/validationMiddleware.js";
import { createWasteSchema, updateWasteSchema } from "../validators/wasteValidation.js";
import { auditMiddleware } from "../middlewares/auditMiddleware.js";

const router = express.Router();

/**
 * Rotas de API - Desperdício (Waste Management)
 * Endpoint: /api/wastes
 * Autenticação: Requer token JWT válido (via protect middleware)
 */

router.use(protect);

router.route('/')
    .get(getWastes) // GET /api/wastes - Lista com filtro e paginação
    .post(validate(createWasteSchema), auditMiddleware("CREATE_WASTE"), createWaste); // POST /api/wastes - Cria novo registro

router.route('/:id')
    .get(getWasteById) // GET /api/wastes/:id - Detalhes
    .put(validate(updateWasteSchema), auditMiddleware("UPDATE_WASTE"), updateWaste) // PUT /api/wastes/:id - Atualiza
    .delete(auditMiddleware("DELETE_WASTE"), deleteWaste); // DELETE /api/wastes/:id - Remove

export default router;
