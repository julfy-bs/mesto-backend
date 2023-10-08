export class InternalServerError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = ErrorCodes.InternalServerError
  }
}
