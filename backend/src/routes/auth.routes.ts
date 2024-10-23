import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = express.Router();

router.post(
  '/register',
  validateRequest(registerSchema),
  register
);

router.post(
  '/login',
  validateRequest(loginSchema),
  login
);

export default router;