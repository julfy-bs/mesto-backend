/**
 * Определяет, является ли статус ответа сервера ошибкой.
 * Ошибкой является любой ответ от сервера, код которого попадает в диапазон от 4xx до 5xx.
 *
 * @function
 * @name isErrorStatusCode
 * @memberOf handleDefaultError
 * @param {number} statusCode - HTTP статус код ответа сервера.
 * @return {boolean}
 */
const isErrorStatusCode = (statusCode: number): boolean => statusCode >= 400 && statusCode < 600;

export default isErrorStatusCode;
