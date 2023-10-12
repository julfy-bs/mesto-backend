import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../../constants/error-text';

export const validatePatchUserData = celebrate(
  {
    body: {
      about: Joi
        .string()
        .min(2)
        .max(200)
        .trim()
        .strict()
        .required(),
      name: Joi
        .string()
        .trim()
        .strict()
        .min(2)
        .max(30)
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
