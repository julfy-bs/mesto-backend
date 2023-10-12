import { ErrorCodes } from '../vendor/constants/error-codes';
import { ErrorText } from '../vendor/constants/error-text';

class BadRequestError extends Error {
  message: string;

  statusCode: number;

  constructor(message = ErrorText.ServerBadRequest, name = 'Bad request') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = ErrorCodes.BadRequest;
  }
}

export default BadRequestError;
