import express from 'express';

import authRoute from './auth.route';
import fileRoute from './file.route';

const router = express.Router();

router.use('/auth', authRoute);

router.use('/file', fileRoute);

export default router;
