import express from 'express';
import { signup, signin, logout, userProfile } from '../controllers/authController.mjs';
import { isAuthenticated } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin); 
router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, userProfile); 

export const authRoutes = router;