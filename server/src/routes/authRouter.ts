import passport from 'passport';
import express from 'express';
import {Strategy as LocalStrategy} from 'passport-local';
import sql from '../db';
import { login, register } from '../controllers/auth';

passport.use(new LocalStrategy(async(username, password, done) => {
  const user = await sql`
    SELECT * FROM users
    WHERE username = ${username}
    AND password = ${password}
  `
  if (!user.length) {
    return done(null, false);
  } 
    return done(null, {username: 'Danieldd'})
},));

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((username, done) => {
  return done(null, username as string)
})

export const authRouter = express.Router();

authRouter
  .route('/login')
  .post(login);

authRouter
  .route('/register')
  .post(register);


  