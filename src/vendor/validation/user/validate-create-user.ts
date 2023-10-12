import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../../constants/error-text';

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
        .min(2)
        .max(30)
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
      'string.empty': ErrorText.Empty,
      'any.required': ErrorText.Required,
    },
  },
);
