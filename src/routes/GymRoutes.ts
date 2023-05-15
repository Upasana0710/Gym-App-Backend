import express from 'express'
import {CreateGym, GetGyms, UpdateGym, DeleteGym} from '../controllers/GymControllers'

const router = express.Router();
router.post('/',CreateGym);
router.get('/',GetGyms);
router.patch('/:id',UpdateGym);
router.delete('/:id',DeleteGym);


export default router;