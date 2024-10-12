import { StatusCodes } from "http-status-codes";

export class BaseResponse<T> {
  status!: StatusCodes;
  message!: string;
  result!: T

  constructor(status: StatusCodes, message: string, result: T) {
    this.status = status;
    this.message = message;
    this.result = result
  }
}