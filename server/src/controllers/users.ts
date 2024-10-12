import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";
import sql from "../db";
import { BaseResponse } from "../lib/utils/BaseResponse";
import { updateUserRequestSchema } from "../lib/validation";
import {StatusCodes} from "http-status-codes";
import { User } from "../models/User";

export const getUsers = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await sql`
      SELECT * FROM users
    `
    if (!users.length) {
      return next(new ErrorResponse('No users found', StatusCodes.NOT_FOUND));
    }
    
    const response = new BaseResponse(StatusCodes.OK, 'success', users)
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);    
  }
}

export const getUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await sql`
      SELECT * FROM users
      WHERE user_id = ${req.params.id}
    `
    if (!user) {
      return next(new ErrorResponse('User not found', StatusCodes.NOT_FOUND));
    }
  
    const response = new BaseResponse(StatusCodes.OK, 'success', user)
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);    
  }
}

export const updateUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = updateUserRequestSchema.parse(req.body);
    const {email} = validation;

    const user = await sql`
      SELECT * FROM users
      WHERE user_id = ${req.params.id}
    ` as unknown as User[];
    if (!user) {
      return next(new ErrorResponse('User not found', StatusCodes.NOT_FOUND));
    }

    if (user[0].email === email) {
      const response = new BaseResponse(StatusCodes.ACCEPTED, 'No Changes', undefined)
      return res.status(response.status).json(response);
    }
  
    const updatedUser = await sql`
      UPDATE users
      SET email = ${email}, updated_at = NOW()
      WHERE user_id = ${req.params.id}
      RETURNING *
    `
    const response = new BaseResponse(StatusCodes.OK, 'Updated User', updatedUser[0])
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }

}