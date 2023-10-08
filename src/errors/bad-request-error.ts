import { ErrorCodes } from '../vendor/constants/error-codes';

export class BadRequestError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = ErrorCodes.BadRequest;
  }
}
