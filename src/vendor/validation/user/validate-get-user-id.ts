import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../../constants/error-text';

export const validateGetUserId = celebrate(
  {
    params: {
      userId: Joi
        .string()
        .hex()
        .trim()
        .strict()
        .required(),
    },
  },
  {
    abortEarly: false,
    messages: {
      'string.hex': ErrorText.Hex,
      'string.hexAlign': ErrorText.HexAlign,
      'string.empty': ErrorText.Empty,
      'string.trim': ErrorText.Trim,
      'string.base': ErrorText.String,
      'any.required': ErrorText.Required,
    },
  },
);
