import { ErrorCodes } from '../vendor/constants/error-codes';
import { ErrorText } from '../vendor/constants/error-text';

class NotFoundError extends Error {
  message: string;

  statusCode: number;

  constructor(message = ErrorText.ServerNotFound, name = 'Not Found') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = ErrorCodes.NotFound;
  }
}
export default NotFoundError;
