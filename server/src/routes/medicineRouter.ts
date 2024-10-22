import express from 'express';
import { sessionAuth } from '../middlewares/sessionAuth';
import { deleteMedicine, getMedicine, getMedicines, updateMedicine } from '../controllers/medicine';

export const medicineRouter = express.Router();

medicineRouter.use(sessionAuth);

medicineRouter
  .route('/medicines')
  .get(getMedicines);

medicineRouter
  .route('/medicine/:id')
  .get(getMedicine);

medicineRouter
  .route('/medicine/:id')
  .post(updateMedicine);

medicineRouter
  .route('/medicine/:id')
  .post(deleteMedicine);

