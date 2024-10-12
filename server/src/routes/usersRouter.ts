import express from 'express';
import { getUser, getUsers, updateUser } from '../controllers/users';
import { sessionAuth } from '../middlewares/sessionAuth';

export const usersRouter = express.Router();

usersRouter.use(sessionAuth);

usersRouter
  .route('/users')
  .get(getUsers);

usersRouter
  .route('/users/:id')
  .get(getUser);

usersRouter
  .route('/users/:id')
  .post(updateUser);

