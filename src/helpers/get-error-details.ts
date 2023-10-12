import process from 'process';
import config from '../vendor/config';
import { ErrorResponseType } from './app-response';

/**
 * Разделяет текст ошибки на тип и сообщение.
 *
 * @function
 * @name splitError
 * @memberOf handleDefaultError
 * @param {Error} error
 * @param {number} part
 * @return {string}
 * */
const splitError = (error: Error, part: number): string => error
  .toString()
  .split(':')[part]
  .trim();

/**
 * Получает подробное описание ошибки в зависимости от условий:
 * - если у ошибки есть поле stack и приложение запущено в режиме разработки
 * `NODE_ENV === config.NODE_ENV` возвращает подробную информацию о том,
 * что за ошибка и где она произошла.
 * - если не выполнилось ни одно из условий возвращает пустую строку.
 *
 * @see config
 *
 * Преднамеренно возвращает строку со стандартным типом ошибки при ответе на клиенте,
 * для защиты приложения.
 *
 * @function
 * @name getErrorBody
 * @memberOf handleDefaultError
 * @param {Error} error
 * @return {string}
 * */
const getErrorName = (error: Error): string => {
  if (typeof error.toString === 'function'
    && process.env.NODE_ENV === config.NODE_ENV) {
    return splitError(error, 0);
  }
  return 'Error';
};

/**
 * Получает текст ошибки в зависимости от условий:
 * - если приложение запущено в режиме разработки `NODE_ENV === config.NODE_ENV,
 * пытается привести объект ошибки к строке.
 * - если не выполнилось ни одно из условий возвращает пустую строку.
 *
 * @see config
 *
 * Преднамеренно возвращает пустую строку при ответе на клиенте, для защиты приложения.
 *
 * @function
 * @name getErrorDetails
 * @memberOf handleDefaultError
 * @param {Error} error
 * @return {string}
 * */
const getErrorMessage = (error: Error): string => {
  if (typeof error.toString === 'function'
    && process.env.NODE_ENV === config.NODE_ENV) {
    return splitError(error, 1);
  }
  return '';
};

/**
 * Получает подробное описание ошибки в зависимости от условий:
 * - если у ошибки есть поле stack и приложение запущено в режиме разработки
 * `NODE_ENVIRONMENT === config.NODE_ENV` возвращает подробную информацию о том,
 * что за ошибка и где она произошла.
 * - если не выполнилось ни одно из условий возвращает пустую строку.
 *
 * @see config
 *
 * Преднамеренно возвращает пустую строку при ответе на клиенте, для защиты приложения.
 *
 * @function
 * @name getErrorBody
 * @memberOf handleDefaultError
 * @param {Error} error
 * @return {string}
 * */
const getErrorBody = (error: Error): string => {
  if (error.stack && process.env.NODE_ENV === config.NODE_ENV) {
    return error.stack;
  }
  return '';
};

/**
 * Собирает воедино все поля для создания детального отчета об ошибке.
 *
 * @function
 * @name getErrorDetails
 * @memberOf handleDefaultError
 * @param {Error} error
 * @return {Omit<ErrorResponseType, 'statusCode'>}
 * */
const getErrorDetails = (error: Error): Omit<ErrorResponseType, 'statusCode'> => ({
  name: getErrorName(error),
  message: getErrorMessage(error),
  body: getErrorBody(error),
});

export default getErrorDetails;
