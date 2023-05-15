import express from 'express';
import {CreateSlot} from '../controllers/SlotControllers'

const router = express.Router();

router.post('/',CreateSlot);

export default router;