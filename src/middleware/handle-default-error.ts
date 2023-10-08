import { Request, Response } from 'express';
import { ErrorCodes } from '../vendor/constants/error-codes';

type ErrorHandlerProps = {
  message: string;
  statusCode: number;
}
export const handleDefaultError = (err: ErrorHandlerProps, req: Request, res: Response) => {
  const { message, statusCode = ErrorCodes.InternalServerError } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ErrorCodes.InternalServerError
        ? 'На сервере произошла непредвиденная ошибка.'
        : message,
    });
};
