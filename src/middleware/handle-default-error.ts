import { NextFunction, Request, Response } from 'express';
import AppResponse, { ErrorResponseType } from '../helpers/app-response';
import getErrorDetails from '../helpers/get-error-details';
import getHttpStatusCode from '../helpers/get-http-status-code';

/**
 * Generic функция - централизованный обработчик ошибок приложения.
 *
 * @function
 * @name handleDefaultError
 * @param {Error} error - объект ошибки.
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
const handleDefaultError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const errorMessage = getErrorDetails(error);
  const errorResponse: ErrorResponseType = {
    statusCode: getHttpStatusCode({ error, response }),
    ...errorMessage,
  };

  if (response.headersSent) {
    return next(error);
  }

  response
    .status(+errorResponse.statusCode)
    .format({
      'application/json': () => {
        response.json(new AppResponse(errorResponse, false).send());
      },
      default: () => {
        response.type('text/plain')
          .send(errorResponse.message);
      },
    });

  next();
};

export default handleDefaultError;
