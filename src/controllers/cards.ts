import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import AppResponse from '../helpers/app-response';
import Card, { CardType } from '../models/card';
import { ErrorText } from '../vendor/constants/error-text';

/**
 * Функция обработчик запроса для получения коллекции карточек.
 * @see CardType
 *
 * @function
 * @name getCards
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const getCards = (request: Request, response: Response, next: NextFunction) => Card.find({})
  .then((cards: CardType[]): void => {
    if (!cards) {
      throw new NotFoundError(ErrorText.ServerCardNotFound);
    }
    response.send(new AppResponse(cards).send());
  })
  .catch(next);

/**
 * Функция обработчик запроса для удаления карточки по ID.
 * @see CardType
 *
 * В запрос передается ID карточки,
 * по которому производится поиск и удаление карточки в коллекции базы данных.
 * ID передается в виде query параметра.
 *
 * @function
 * @name deleteCardById
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const deleteCardById = (request: Request, response: Response, next: NextFunction) => {
  const { cardId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }

  return Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ErrorText.ServerCardDeleteNotFound);
      }
      response.send(new AppResponse(card).send());
    })
    .catch(next);
};

/**
 * Функция обработчик запроса для создания карточки.
 * @see CardType
 *
 * В запрос в теле запроса передается название карточки и ссылка на обложку карточки.
 * Внутри функции необходим доступ к ID активного пользователя, для создания поля owner.
 *
 * @function
 * @name createCard
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const createCard = (request: Request, response: Response, next: NextFunction) => {
  const { name, link } = request.body;
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  return Card.create({ name, link, owner: request.user._id })
    .then((newCard) => {
      if (!newCard) {
        throw new BadRequestError(ErrorText.ServerCardCreate);
      }
      response.send(new AppResponse(newCard).send());
    })
    .catch(next);
};

/**
 * Функция обработчик запроса для добавления отметки "понравилось" для карточки.
 * @see CardType
 *
 * В запрос передается ID карточки,
 * по которому производится поиск нужной карточки в коллекции базы данных
 * и добавление в массив likes ID текущего пользователя. ID передается в виде query параметра.
 *
 * @function
 * @name likeCard
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const likeCard = (request: Request, response: Response, next: NextFunction) => {
  const { cardId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  return Card.findByIdAndUpdate(
    cardId,
    // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
    { $addToSet: { likes: request.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ErrorText.ServerCardLike);
      }
      response.send(new AppResponse(card).send());
    })
    .catch(next);
};

/**
 * Функция обработчик запроса для добавления отметки "понравилось" для карточки.
 * @see CardType
 *
 * В запрос передается ID карточки,
 * по которому производится поиск нужной карточки в коллекции базы данных
 * и удаления ID текущего пользователя из массива likes. ID передается в виде query параметра.
 *
 * @function
 * @name dislikeCard
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const dislikeCard = (request: Request, response: Response, next: NextFunction) => {
  const { cardId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  return Card.findByIdAndUpdate(
    cardId,
    // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
    { $pull: { likes: request.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ErrorText.ServerCardDislike);
      }
      response.send(new AppResponse(card).send());
    })
    .catch(next);
};
