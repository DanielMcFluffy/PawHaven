import express from 'express';
import { getUser, getUsers } from '../controllers/users';
import { sessionAuth } from '../middlewares/sessionAuth';

export const usersRouter = express.Router();

usersRouter.use(sessionAuth);

usersRouter
  .route('/users')
  .get(getUsers);

usersRouter
  .route('/users/:id')
  .get(getUser);
