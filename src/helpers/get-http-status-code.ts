import { isCelebrateError } from 'celebrate';
import { Response } from 'express';
import { StatusCodes } from '../vendor/constants/status-codes';
import isErrorStatusCode from './is-error-status-code';

type getHttpStatusCodeOptions = {
  error: Error & { status?: string; statusCode?: string; };
  response: Response;
}

/**
 * Находит код состояния HTTP-ошибки (в порядке предпочтения):
 * - Объект ошибки (`status` или `StatusCode`)
 * - Объект экспресс-ответа (`StatusCode`)
 *
 * Возвращает 500 HTTP статус код сервера (внутренняя ошибка сервера),
 * если не получилось установить код, переданный самой ошибкой.
 *
 * @function
 * @name getHttpStatusCode
 * @memberOf handleDefaultError
 * @param {Error} options.error - объект ошибки
 * @param {Response} options.response - объект ответа Express
 * @return {number} - HTTP статус код сервера
 */
const getHttpStatusCode = (options: getHttpStatusCodeOptions): number => {
  const { error, response } = options;
  const statusCodeFromError = error.status || error.statusCode;

  if (isCelebrateError(error)) {
    return StatusCodes.BadRequest;
  }

  if (statusCodeFromError && isErrorStatusCode(+statusCodeFromError)) {
    return +statusCodeFromError;
  }

  const statusCodeFromResponse = response.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse;
  }

  return StatusCodes.InternalServerError;
};

export default getHttpStatusCode;
