import express from 'express';

import { anyMulter } from '../utils/multer';
import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

import { sellerController } from '../controllers/index';

const {
  getAllSellers,
  getSeller,
  addSeller,
  updateSellerDetails,
  deleteSeller
} = sellerController;

const router = express.Router();

router.get('/', getAllSellers);

router.get('/', getSeller);

router.use(protect);

router.use(restrictedTo('it', 'admin', 'root'));

router.post('/', anyMulter(), addSeller);

router.put('/', anyMulter(), updateSellerDetails);

router.delete('/', deleteSeller);

export default router;
