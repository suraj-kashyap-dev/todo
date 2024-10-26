import express from 'express';
import { index, upload, show, destroy } from '../controllers/media.controller';
import { uploadSingle } from '../utils/uploadHelper';

export const router = express.Router();

router.get('/', index);

router.post('/upload/single', uploadSingle('file'), upload);

router.get('/:id', show);

router.delete('/:id', destroy);

export default router;
