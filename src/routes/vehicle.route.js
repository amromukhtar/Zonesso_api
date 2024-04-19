import express from 'express';

import { anyMulter } from '../utils/multer';
import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

import { vehicleController } from '../controllers/index';

const {
  getAllVehicles,
  getVehicle,
  addVehicle,
  updateVehicleDetails,
  deleteVehicle
} = vehicleController;

const router = express.Router();

router.get('/', getAllVehicles);

router.get('/', getVehicle);

router.use(protect);

router.use(restrictedTo('it', 'admin', 'root'));

router.post('/', anyMulter(), addVehicle);

router.put('/', anyMulter(), updateVehicleDetails);

router.delete('/', deleteVehicle);

export default router;
