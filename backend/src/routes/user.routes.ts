import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { index, update } from '../controllers/user.controller';

export const router = express.Router();

router.get('/me', authMiddleware, index);

router.put('/me', authMiddleware, update);

export default router;