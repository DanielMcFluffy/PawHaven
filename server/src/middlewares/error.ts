import { NextFunction } from "express";
import {Request, Response} from 'express';
import { ErrorResponse } from "../lib/utils/errorResponse";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // validation error
  if (err instanceof ZodError) {
    let validationErrors = '';
    for (const issue of error.issues) {
      validationErrors += (
        error.issues.indexOf(issue) !== (error.issues.length - 1) ? 
        issue.message + ', ' :
        issue.message
      )
    }
    error = new ErrorResponse(validationErrors, StatusCodes.BAD_REQUEST);
  }

  //duplicated key
  if (error.code === '23505') {
    error = new ErrorResponse(error.detail, StatusCodes.CONFLICT)
  }

  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: error.status,
    message: error.message || 'Server Error'
  });
};

