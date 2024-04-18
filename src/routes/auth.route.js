import express from 'express';

import { authController } from '../controllers/index';

import protect from '../middlewares/protect';

const { signin, signup, logout, refreshTokens, getUserInfo } = authController;

const router = express.Router();

router.post('/login', signin);

router.post('/register', signup);

router.post('/logout', logout);

router.post('/tokens', refreshTokens);

router.use(protect);

router.get('/get-info', getUserInfo);

export default router;
