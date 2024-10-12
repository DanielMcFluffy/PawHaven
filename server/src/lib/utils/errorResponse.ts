import { StatusCodes } from "http-status-codes";

export class ErrorResponse extends Error {
  status!: StatusCodes;

  constructor(message: string, status: StatusCodes) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

