
import express from 'express';
import { authMiddleware as protect } from '../middlewares/authMiddleware.js';
import { 
    getWastes, 
    createWaste, 
    getWasteById,
    updateWaste,
    deleteWaste 
} from '../controllers/wasteController.js';

const router = express.Router();

/**
 * Rotas de API - Desperdício (Waste Management)
 * Endpoint: /api/wastes
 * Autenticação: Requer token JWT válido (via protect middleware)
 */

router.use(protect);

router.route('/')
    .get(getWastes) // GET /api/wastes - Lista com filtro e paginação
    .post(createWaste); // POST /api/wastes - Cria novo registro

router.route('/:id')
    .get(getWasteById) // GET /api/wastes/:id - Detalhes
    .put(updateWaste) // PUT /api/wastes/:id - Atualiza
    .delete(deleteWaste); // DELETE /api/wastes/:id - Remove

export default router;
