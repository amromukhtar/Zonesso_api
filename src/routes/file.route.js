import express from 'express';

import { anyMulter } from '../utils/multer';
import protect from '../middlewares/protect';

import { fileController } from '../controllers/index';

const { getAllFiles, getFile, addFile, updateFileDetails, deleteFile } =
  fileController;

const router = express.Router();

router.get('/', getAllFiles);

router.get('/:id', getFile);

router.use(protect);

router.post('/', anyMulter(), addFile);

router.put('/:id', updateFileDetails);

router.delete('/:id', deleteFile);

export default router;
