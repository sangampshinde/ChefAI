import express from 'express'
const router = express.Router();
import * as authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/auth.js';

