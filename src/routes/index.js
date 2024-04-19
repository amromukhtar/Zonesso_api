import express from 'express';

import authRoute from './auth.route';
import vehicleRoute from './vehicle.route';
import sellerRoute from './seller.route';

const router = express.Router();

router.use('/auth', authRoute);

router.use('/vehicle', vehicleRoute);

router.use('/seller', sellerRoute);

export default router;
