import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../../constants/error-text';

export const validateLogin = celebrate(
  {
    body: {
      email: Joi
        .string()
        .trim()
        .email()
        .required(),
      password: Joi
        .string()
        .min(8)
        .trim()
        .required(),
    },
  },
  {
    abortEarly: false,
    messages: {
      'string.email': ErrorText.Email,
      'string.base': ErrorText.String,
      'string.trim': ErrorText.Trim,
      'string.min': ErrorText.Min,
      'string.empty': ErrorText.Empty,
      'any.required': ErrorText.Required,
    },
  },
);
