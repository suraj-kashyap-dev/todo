import express from 'express';
import { index, upload, uploads, show, destroy } from '../controllers/media.controller';
import { uploadSingle, uploadMultiple } from '../utils/uploadHelper';

export const router = express.Router();

router.get('/', index);

router.post('/upload/single', uploadSingle('file'), upload);

router.post('/upload/multiple', uploadMultiple('files', 5), uploads);

router.get('/:id', show);

router.delete('/:id', destroy);

export default router;
