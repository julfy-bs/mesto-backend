import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500)
      .send({ message: 'Произошла ошибка' }));
};

export const deleteCardById = (req: Request, res: Response) => {
  const cardId = req.params.cardId;
  return Card.findByIdAndDelete(cardId)
    .then(card => res.send({ card }))
    .catch(() => res.status(500)
      .send({ message: 'Пользователь не найден' }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  // @ts-ignore
  return Card.create({ name, link, owner: req.user._id })
    .then(newCard => res.send(newCard))
    .catch(() => res.status(500)
      .send({ message: 'Ошибка при создании карточки' }));
};

export const likeCard = (req: Request, res: Response) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-ignore
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(() => res.status(500)
      .send({ message: 'Ошибка при лайке карточки.' }));
};

export const dislikeCard = (req: Request, res: Response) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-ignore
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(() => res.status(500)
      .send({ message: 'Ошибка при дизлайке карточки.' }));
};
