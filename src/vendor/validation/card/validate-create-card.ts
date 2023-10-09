import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../../constants/error-text';

export const validateCreateCard = celebrate(
  {
    body: {
      name: Joi
        .string()
        .min(2)
        .max(30)
        .trim()
        .strict()
        .required(),
      link: Joi
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
      'string.empty': ErrorText.Empty,
      'any.required': ErrorText.Required,
    },
  },
);
