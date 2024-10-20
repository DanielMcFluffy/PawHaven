import { NextFunction, Request, Response } from "express";
import passport, { AuthenticateCallback } from "passport";
import { ErrorResponse } from "../lib/utils/errorResponse";
import { BaseResponse } from "../lib/utils/BaseResponse";
import sql from "../db";
import { generateSessionToken } from "../lib/utils/crypto";
import { User } from "../models/User";
import { loginRequestSchema, registerRequestSchema } from "../lib/validation";
import bcrypt from 'bcrypt';
import { configDotenv } from "dotenv";
import { StatusCodes } from "http-status-codes";

configDotenv({path: ".././config/config.env"})  

type ParamsAuthenticateCallback = Parameters<AuthenticateCallback>;

export const login = async(req: Request, res: Response, next: NextFunction) => {
  try {
    loginRequestSchema.parse(req.body)
  } catch (error) {
    next(error)    
  }
  passport.authenticate('local', (...args: ParamsAuthenticateCallback) => {
    const [err, user, info, status] = args;

    if (err) { return next(err) }

    if (!user) {
      return next(new ErrorResponse('User doesn\'t exist', StatusCodes.NOT_FOUND))
    }

    req.login(user, async(err) => {
      if (err) {
        return next(err);
      }
      try {

        const session = await sql`
          SELECT * FROM sessions
          WHERE session_id = ${req.sessionID}
        `
        if (!session.length) {
          const sessionToken = generateSessionToken();
          const sessionData = {
            expires: req.session.cookie.originalMaxAge
          };
          
          await sql`
            INSERT INTO sessions (session_id, session_token_id, user_id, data)
            VALUES (${req.sessionID}, ${sessionToken}, ${(req.user as User).user_id}, ${sql.json(sessionData)})
            RETURNING *
          `
          const response = new BaseResponse(StatusCodes.OK, 'Login successful', {user, sessionToken})
          return res.status(response.status).json(response);
        } else {
          const sessionToken = generateSessionToken();
            await sql`
              UPDATE sessions
              SET expires = ${req.session.cookie.originalMaxAge},
                  session_token_id = ${sessionToken},
                  updated_at = NOW()
              WHERE session_id = ${req.sessionID}
            `
          const response = new BaseResponse(StatusCodes.OK, 'Login successful', {user, sessionToken})
          return res.status(response.status).json(response);
        }

      } catch (error) {
        next(error);
      }
        
      });
    })(req, res, next);
};

export const register = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedRequest = registerRequestSchema.parse(req.body)
    const {username, password, email} = validatedRequest;

  if (!username || !password || !email) {
    return next(new ErrorResponse('Please fill all required fields', StatusCodes.BAD_REQUEST));
  }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
  
      // Insert user into the database
      const user = await sql`
        INSERT INTO users (username, password, email)
        VALUES (${username}, ${hashedPassword}, ${email})
        RETURNING *;
      `;

  const response = new BaseResponse(StatusCodes.OK, 'Registration successful', user);
  return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}

export const checkSession = async(req: Request, res: Response, next: NextFunction) => {
  console.log(req.isAuthenticated())
  try {
    if (req.isAuthenticated()) {
      const response = new BaseResponse(StatusCodes.OK, 'valid session', true);
      return res.status(response.status).json(response);
    } else {
      const response = new BaseResponse(StatusCodes.UNAUTHORIZED, 'invalid session', false);
      return res.status(response.status).json(response);
    }
  } catch (error) {
      return next(error);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logOut({ keepSessionInfo: false }, (err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      // Clear the session cookie
      res.clearCookie('connect.sid', {
        httpOnly: false,
      });

      const response = new BaseResponse(StatusCodes.OK, 'Logged out', undefined);
      return res.status(response.status).json(response);
    });
  });
}