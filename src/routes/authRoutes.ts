// src/routes/authRoutes.ts
import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/secured', authController.securedPage);

export default router;
