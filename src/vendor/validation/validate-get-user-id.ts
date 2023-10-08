import { celebrate, Joi } from 'celebrate';
import { ErrorText } from '../constants/error-text';

export const validateGetUserId = celebrate(
  {
    params: {
      userId: Joi.string()
        .hex()
        .required(),
    },
  },
  {
    abortEarly: false,
    messages: {
      'string.hex': ErrorText.Hex,
      'string.hexAlign': ErrorText.HexAlign
    },
  },
);
