import { NextFunction, Request, Response } from "express";
import passport, { AuthenticateCallback } from "passport";
import { ErrorResponse } from "../utils/errorResponse";
import { BaseResponse } from "../utils/BaseResponse";
import { RegisterRequest } from "../models/RegisterRequest";
import sql from "../db";

type ParamsAuthenticateCallback = Parameters<AuthenticateCallback>;

export const login = async(req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (...args: ParamsAuthenticateCallback) => {
    const [err, user, info, status] = args;

    if (err) { return next(err) }

    if (!user) {
      return next(new ErrorResponse('User doesn\'t exist', 404))
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const response = new BaseResponse(200, 'Login successful', user)
      return res.status(response.status).json(response);
    });
  })(req, res, next);
};

export const register = async(req: Request, res: Response, next: NextFunction) => {
  const {username, password, email} = req.body as RegisterRequest;

  if (!username || !password || !email) {
    return next(new ErrorResponse('Please fill all required fields', 400));
  }

  try {
    const user = await sql`
    INSERT INTO users (username, password, email)
    VALUES (${username}, ${password}, ${email})
    RETURNING *
  `;
  const response = new BaseResponse(200, 'Registration successful', user);
  return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }

}