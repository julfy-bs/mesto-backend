import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../constants/error-text';

export const validateCreateUser = celebrate(
  {
    body: {
      about: Joi
        .string()
        .min(2)
        .max(200)
        .trim()
        .strict()
        .required(),
      avatar: Joi
        .string()
        .trim()
        .strict()
        .required(),
      name: Joi
        .string()
        .trim()
        .strict()
        .required(),
    },
  },
  {
    abortEarly: false,
    messages: {
      'string.base': ErrorText.String,
      'string.trim': ErrorText.Trim,
      'string.min': ErrorText.Min,
      'string.max': ErrorText.Max,
      'any.required': ErrorText.Required,
      'string.dataUri': ErrorText.DataUri,
      'string.empty': ErrorText.Empty,
    },
  },
);
