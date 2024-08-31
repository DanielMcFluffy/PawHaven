import { NextFunction } from "express";
import {Request, Response} from 'express';
import { ErrorResponse } from "../utils/errorResponse";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };

  error.message = err.message;

  console.error(err);

  //duplicated key
  if ((error as any).code === '23505') {
    error = new ErrorResponse(error.detail, 409)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

