import { ErrorCodes } from '../vendor/constants/error-codes';

export class NotFoundError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = ErrorCodes.NotFound;
  }
}
