import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import AppResponse, { ValidationErrorResponseType } from '../helpers/app-response';
import { ErrorCodes } from '../vendor/constants/error-codes';
import { ErrorText } from '../vendor/constants/error-text';

type ValidationSources = 'body' | 'params' | 'cookies' | 'headers';
const createValidationErrorResponse = (validatedData: ValidationSources[], error = 'Bad request', message = 'Ошибка валидации входных данных'): ValidationErrorResponseType => {
  const errorResponse: ValidationErrorResponseType = {
    statusCode: ErrorCodes.BadRequest,
    name: error,
    message: message || ErrorText.ServerBadRequest,
  };
  validatedData.forEach((item) => {
    errorResponse[item] = { rules: [], keys: [] };
  });
  return errorResponse;
};

const createValidationHints = (
  message: string,
  key: string,
  rulesArray: string[],
  keysArray: string[],
) => {
  if (message) rulesArray.push(message);
  if (key) keysArray.push(key);
};

const handleValidationError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (isCelebrateError(error)) {
    const errorBody = error.details.get('body');
    const errorParams = error.details.get('params');
    let errorResponse: ValidationErrorResponseType | null = null;

    if (errorBody) {
      errorResponse = createValidationErrorResponse(['body']);
      errorBody.details.forEach((errorItem) => {
        if (errorItem.context?.key && errorResponse?.body?.rules) {
          createValidationHints(
            errorItem.message,
            errorItem.context?.key,
            errorResponse?.body?.rules,
            errorResponse?.body?.keys,
          );
        }
      });
    }

    if (errorParams) {
      errorResponse = createValidationErrorResponse(['params']);
      errorParams.details.forEach((errorItem) => {
        if (errorItem.context?.key && errorResponse?.params?.rules) {
          createValidationHints(
            errorItem.message,
            errorItem.context?.key,
            errorResponse?.params?.rules,
            errorResponse?.params?.keys,
          );
        }
      });
    }

    if (errorResponse) {
      response
        .status(+errorResponse.statusCode)
        .format({
          'application/json': () => {
            response.json(new AppResponse(errorResponse, false).send());
          },
          default: () => {
            if (errorResponse?.message) {
              response.type('text/plain')
                .send(errorResponse.message);
            }
          },
        });
    }
  }

  next(error);
};

export default handleValidationError;
