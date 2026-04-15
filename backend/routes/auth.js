import express from 'express'
const router = express.Router();
import * as authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/auth.js';

// Auth Routes (Public)
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.requestPasswordReset);


// Protected route import authMiddleware
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;



