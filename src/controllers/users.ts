import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import AppResponse from '../helpers/app-response';
import User from '../models/user';
import { ErrorText } from '../vendor/constants/error-text';

/**
 * Функция обработчик запроса для получения коллекции пользователей.
 * @see UserType
 *
 * @function
 * @name getUsers
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const getUsers = (request: Request, response: Response, next: NextFunction) => User.find({})
  .then((users) => {
    if (users.length === 0) {
      throw new NotFoundError(ErrorText.ServerUserNotFound);
    }
    response.send(new AppResponse(users).send());
  })
  .catch(next);

/**
 * Функция обработчик запроса для получения пользователя по ID из коллекции.
 * @see UserType
 *
 * В запрос передается ID пользователя,
 * по которому производится его поиск в коллекции базы данных.
 * ID передается в виде query параметра.
 *
 * @function
 * @name getUserById
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const getUserById = (request: Request, response: Response, next: NextFunction) => {
  const { userId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestError(ErrorText.ServerId);
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ErrorText.ServerUserNotFound);
      }
      response.send(new AppResponse(user).send());
    })
    .catch(next);
};

/**
 * Функция обработчик запроса для создания пользователя.
 * @see UserType
 *
 * В запрос в теле запроса передается имя пользователя, его аватар и описание профиля.
 *
 * @function
 * @name createUser
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const createUser = (request: Request, response: Response, next: NextFunction) => {
  const { about, avatar, name } = request.body;
  return User.create({ about, avatar, name })
    .then((newUser) => {
      if (!newUser) {
        throw new BadRequestError(ErrorText.ServerUserCreate);
      }
      response.send(new AppResponse(newUser).send());
    })
    .catch(next);
};

/**
 * Функция обработчик запроса для создания пользователя.
 * @see UserType
 *
 * В запрос в теле запроса передается новое имя пользователя или новое описание профиля.
 * Внутри функции необходим доступ к ID активного пользователя,
 * для поиска и обновления информации пользователя.
 *
 * @function
 * @name patchUserData
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const patchUserData = (request: Request, response: Response, next: NextFunction) => {
  const { about, name } = request.body;
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  return User.findByIdAndUpdate(request.user._id, { about, name }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ErrorText.ServerUserNotFound);
      }
      response.send(new AppResponse(user).send());
    })
    .catch(next);
};

/**
 * Функция обработчик запроса для создания пользователя.
 * @see UserType
 *
 * В запрос в теле запроса передается новый аватар.
 * Внутри функции необходим доступ к ID активного пользователя,
 * для поиска и обновления информации пользователя.
 *
 * @function
 * @name patchUserAvatar
 * @param {Request} request - объект запроса Express.
 * @see Request
 * @param {Response} response - объект ответа Express.
 * @see Response
 * @param {NextFunction} next - функция `next()` Express.
 * @see NextFunction
 */
export const patchUserAvatar = (request: Request, response: Response, next: NextFunction) => {
  const { avatar } = request.body;
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerId);
  }
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  return User.findByIdAndUpdate(request.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ErrorText.ServerUserNotFound);
      }
      response.send(new AppResponse(user).send());
    })
    .catch(next);
};
