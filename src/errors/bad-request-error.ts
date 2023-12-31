import { StatusCodes } from '../vendor/constants/status-codes';
import { ErrorText } from '../vendor/constants/error-text';

class BadRequestError extends Error {
  message: string;

  statusCode: number;

  constructor(message = ErrorText.ServerBadRequest, name = 'Bad request') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = StatusCodes.BadRequest;
  }
}

export default BadRequestError;
