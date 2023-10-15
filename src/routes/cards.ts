import { Router } from 'express';
import {
  createCard, deleteCardById, getCards, likeCard, dislikeCard,
} from '../controllers/cards';
import cardValidation from '../vendor/validation/card';

const router = Router();
router.get('/', getCards);
router.post('/', cardValidation.create, createCard);
router.delete('/:cardId', cardValidation.deleteById, deleteCardById);
router.put('/:cardId/likes', cardValidation.like, likeCard);
router.delete('/:cardId/likes', cardValidation.dislike, dislikeCard);

export default router;
