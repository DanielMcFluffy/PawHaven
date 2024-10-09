import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";
import sql from "../db";
import { BaseResponse } from "../lib/utils/BaseResponse";

export const getUsers = async(req: Request, res: Response, next: NextFunction) => {
  const users = await sql`
    SELECT * FROM users
  `
  if (!users.length) {
    return next(new ErrorResponse('No users found', 404));
  }
  
  const response = new BaseResponse(200, 'success', users)
  return res.status(response.status).json(response);
}

export const getUser = async(req: Request, res: Response, next: NextFunction) => {
  const user = await sql`
    SELECT * FROM users
    WHERE user_id = ${req.params.id}
  `
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  const response = new BaseResponse(200, 'success', user)
  return res.status(response.status).json(response);
}