import { ErrorCodes } from '../vendor/constants/error-codes';

class NotFoundError extends Error {
  message: string;

  statusCode: number;

  constructor(message: string, name = 'Not Found') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = ErrorCodes.NotFound;
  }
}
export default NotFoundError;
