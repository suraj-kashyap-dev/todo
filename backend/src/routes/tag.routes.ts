import express from 'express';
import { validateRequest } from '../middleware/validate.middleware';
import { tagSchema } from '../validators/tag.validator';
import { store } from '../controllers/tag.controller';

const router = express.Router();

router.post('/store', validateRequest(tagSchema), store);

export default router;
