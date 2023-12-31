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
        .strict(),
      avatar: Joi
        .string()
        .trim()
        .strict(),
      email: Joi
        .string()
        .trim()
        .required()
        .email(),
      name: Joi
        .string()
        .min(2)
        .max(30)
        .trim()
        .strict(),
      password: Joi
        .string()
        .min(8)
        .trim()
        .required(),
      repeatPassword: Joi
        .ref('password'),
    },
  },
  {
    abortEarly: false,
    messages: {
      'string.email': ErrorText.Email,
      'string.base': ErrorText.String,
      'string.trim': ErrorText.Trim,
      'string.min': ErrorText.Min,
      'string.max': ErrorText.Max,
      'string.empty': ErrorText.Empty,
      'any.required': ErrorText.Required,
    },
  },
);
