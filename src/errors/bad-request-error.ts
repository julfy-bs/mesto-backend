import { ErrorCodes } from '../vendor/constants/error-codes';

class BadRequestError extends Error {
  message: string;

  statusCode: number;

  constructor(message: string, name = 'Bad request') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = ErrorCodes.BadRequest;
  }
}

export default BadRequestError;
