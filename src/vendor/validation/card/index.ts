import { validateCreateCard } from './validate-create-card';
import { validateDeleteCard } from './validate-delete-card';
import { validateLikeCard } from './validate-like-card';

export default {
  deleteById: validateDeleteCard,
  create: validateCreateCard,
  like: validateLikeCard,
  dislike: validateLikeCard,
}
