import passport from 'passport';
import express from 'express';
import {Strategy as LocalStrategy} from 'passport-local';
import { ErrorResponse } from '../utils/errorResponse';
import { BaseResponse } from '../utils/BaseResponse';


passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'Daniel' && password === 'daniel') {
    return done(null, {username: 'Danieldd'})
  } else {
    done(null, false)
  }
},));

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((username, done) => {
  return done(null, username as string)
})

export const authRouter = express.Router();

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user)
  console.log(req.session);
  console.log(req.sessionID)
  console.log(req.session.id)
  console.log(req.session.cookie)

  const response = new BaseResponse(200, 'Authenticated', {
    session: req.session,
    user: req.user,
    reqAuth: req.isAuthenticated()
  })

  res.status(response.status).json(response)
})

authRouter.get('/logout', (req, res, next) => {

  if (req.isAuthenticated()) {
    req.logOut({keepSessionInfo: false}, (err) => {
      if (err) return next(
        new ErrorResponse('Something happened', 500)
      );
    })
  } else {
    res.status(200)

  }
})
