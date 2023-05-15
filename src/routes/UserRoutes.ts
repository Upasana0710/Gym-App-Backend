import express from 'express'
import {signin,signup,googleSignin,googleSignup,getAllUsers} from '../controllers/UserControllers'

const router = express.Router();
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/googlesignin',googleSignin);
router.post('/googlesignup',googleSignup);
router.get('/',getAllUsers);

export default router;