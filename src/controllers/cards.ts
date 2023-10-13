import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import InvalidAuthentication from '../errors/invalid-authentication';
import NotFoundError from '../errors/not-found-error';
import AppResponse from '../helpers/app-response';
import Card, { CardType } from '../models/card';
import { ErrorText } from '../vendor/constants/error-text';
import { StatusCodes } from '../vendor/constants/status-codes';

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
export const getCards = (request: Request, response: Response, next: NextFunction) =>
  Card.find({})
    .orFail(new NotFoundError(ErrorText.ServerCardNotFound))
    .then((cards: CardType[]): void => {
      response
        .status(StatusCodes.Success)
        .send(new AppResponse(cards).send());
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
  const { _id: userId } = request.user;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }

  return Card.findByIdAndDelete(cardId)
    .orFail(new NotFoundError(ErrorText.ServerCardDeleteNotFound))
    .then((card) => {
        if (userId !== card.owner) {
          throw new InvalidAuthentication(ErrorText.ServerAuthDeleteError);
        }
        response
          .status(StatusCodes.Success)
          .send(new AppResponse(card).send());
      },
    )
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
  const { _id: userId } = request.user;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  return Card.create({ name, link, owner: userId.toString() })
    .then((newCard) => {
      if (!newCard) {
        throw new BadRequestError(ErrorText.ServerCardCreate);
      }
      response
        .status(StatusCodes.Created)
        .send(new AppResponse(newCard).send());
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
  const { _id: userId } = request.user;

  if (!mongoose.Types.ObjectId.isValid(cardId)
    || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(ErrorText.ServerCardLike))
    .then((card) => response
      .status(StatusCodes.Success)
      .send(new AppResponse(card).send()),
    )
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
  const { _id: userId } = request.user;

  if (!mongoose.Types.ObjectId.isValid(cardId)
    || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(ErrorText.ServerCardDislike))
    .then((card) => response
      .status(StatusCodes.Success)
      .send(new AppResponse(card).send()),
    )
    .catch(next);
};
