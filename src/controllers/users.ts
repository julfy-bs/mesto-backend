import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import AppResponse from '../helpers/app-response';
import User from '../models/user';
import { sanitizedConfig } from '../vendor/constants/config';
import { ErrorText } from '../vendor/constants/error-text';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from '../vendor/constants/status-codes';

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
  .orFail(new NotFoundError(ErrorText.ServerUserNotFound))
  .then((users) => response
    .status(StatusCodes.Success)
    .send(new AppResponse(users).send()),
  )
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

  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerRequestsAuth);
  }

  User.findById(userId)
    .orFail(new NotFoundError(ErrorText.ServerUserNotFound))
    .then((user) =>
      response
        .status(StatusCodes.Success)
        .send(new AppResponse(user).send()),
    )
    .catch(next);
};

/**
 * Функция обработчик запроса для получения текущего пользователя из коллекции.
 * @see UserType
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
export const getCurrentUser = (request: Request, response: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerRequestsAuth);
  }

  User.findById(request.user._id)
    .orFail(new NotFoundError(ErrorText.ServerUserNotFound))
    .then((user) =>
      response
        .status(StatusCodes.Success)
        .send(new AppResponse(user).send()),
    )
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
  const { password, about, avatar, name, email } = request.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ about, avatar, name, email, password: hash }))
    .then(newUser => {
      if (!newUser) {
        throw new BadRequestError(ErrorText.ServerUserCreate);
      }
      response
        .status(StatusCodes.Created)
        .send(new AppResponse(newUser).send());
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
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerRequestsAuth);
  }
  User.findByIdAndUpdate(request.user._id, { about, name }, { new: true })
    .orFail(new NotFoundError(ErrorText.ServerUserNotFound))
    .then((user) =>
      response
        .status(StatusCodes.Success)
        .send(new AppResponse(user).send()),
    )
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
  if (!mongoose.Types.ObjectId.isValid(request.user._id)) {
    throw new BadRequestError(ErrorText.ServerRequestsAuth);
  }
  User.findByIdAndUpdate(request.user._id, { avatar }, { new: true })
    .orFail(new NotFoundError(ErrorText.ServerUserNotFound))
    .then((user) => response
      .status(StatusCodes.Success)
      .send(new AppResponse(user).send()),
    )
    .catch(next);
};

export const login = (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id.toString(),
        },
        sanitizedConfig.AUTH_ACCESS_TOKEN_SECRET,
        {
          expiresIn: sanitizedConfig.AUTH_ACCESS_TOKEN_EXPIRY,
        },
      );

      response
        .status(StatusCodes.Created)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
          // secure: true
        });
      response
        .status(StatusCodes.Created)
        .send(new AppResponse({ message: `Идентификация прошла успешно` }).send());
    })
    .catch(next);
};
