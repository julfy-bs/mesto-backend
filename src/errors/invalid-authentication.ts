import { StatusCodes } from '../vendor/constants/status-codes';
import { ErrorText } from '../vendor/constants/error-text';

class InvalidAuthentication extends Error {
  message: string;

  statusCode: number;

  constructor(message = ErrorText.ServerEmailOrPassword, name = 'Unauthorized') {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = StatusCodes.Unauthorized;
  }
}

export default InvalidAuthentication;
