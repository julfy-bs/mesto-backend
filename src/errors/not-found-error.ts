import { StatusCodes } from '../vendor/constants/status-codes';
import { ErrorText } from '../vendor/constants/error-text';

class NotFoundError extends Error {
  message: string;

  statusCode: number;

  constructor(message = ErrorText.ServerNotFound, name = 'Not Found') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = StatusCodes.NotFound;
  }
}
export default NotFoundError;
