import { Router } from 'express';
import {
  createCard, deleteCardById, getCards, likeCard, dislikeCard,
} from '../controllers/cards';
import cardValidation from '../vendor/validation/card';

const router = Router();
router.get('/cards', getCards);
router.post('/cards', cardValidation.create, createCard);
router.delete('/cards/:cardId', cardValidation.deleteById, deleteCardById);
router.put('/cards/:cardId/likes', cardValidation.like, likeCard);
router.delete('/cards/:cardId/likes', cardValidation.dislike, dislikeCard);

export default router;
