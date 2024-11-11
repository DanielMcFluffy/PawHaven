import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/users';
import { sessionAuth } from '../middlewares/sessionAuth';

export const userRouter = express.Router();

userRouter.use(sessionAuth);

userRouter
  .route('/users')
  .get(getUsers);

userRouter
  .route('/users/:id')
  .get(getUser);

userRouter
  .route('/users/:id')
  .post(updateUser);

userRouter
  .route('/users/:id')
  .delete(deleteUser);