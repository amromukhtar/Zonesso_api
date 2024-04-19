import express from 'express';

import authRoute from './auth.route';
import vehicleRoute from './vehicle.route';

const router = express.Router();

router.use('/auth', authRoute);

router.use('/vehicle', vehicleRoute);

export default router;
