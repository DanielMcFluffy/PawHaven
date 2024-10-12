import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";
import { StatusCodes } from "http-status-codes";

export const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.session as any)?.passport?.user?.username) {
    return next(new ErrorResponse('Unauthorized', StatusCodes.UNAUTHORIZED));
  }
  
  return  next();
}
