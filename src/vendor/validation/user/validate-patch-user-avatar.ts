import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../../constants/error-text';

export const validatePatchUserAvatar = celebrate(
  {
    body: {
      avatar: Joi
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
      'string.empty': ErrorText.Empty,
      'any.required': ErrorText.Required,
    },
  },
);
