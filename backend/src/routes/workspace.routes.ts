import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
    store,
    index,
    show,
    update,
    destroy,
} from "../controllers/workspace.controller";

export const router = express.Router();

router.get("/", authMiddleware, index);
router.post("/", authMiddleware, store);
router.get("/:id", authMiddleware, show);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, destroy);

export default router;