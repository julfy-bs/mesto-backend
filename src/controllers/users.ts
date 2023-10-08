import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import User from '../models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then(users => {
      if (!users) {
        throw new NotFoundError('При поиске пользователя произошла ошибка');
      }
      res.send({ data: users });
    })
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError('При поиске пользователя произошла ошибка');
      }
      res.send({ user })
    })
    .catch(err => next(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { about, avatar, name } = req.body;
  return User.create({ about, avatar, name })
    .then(newUser => res.send(newUser))
    .catch(next);
};

export const patchUserData = (req: Request, res: Response, next: NextFunction) => {
  const { about, name } = req.body;
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  return User.findByIdAndUpdate(req.user._id, { about, name }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('При поиске пользователя произошла ошибка');
      }
      res.send(user);
    })
    .catch(next);
};

export const patchUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(user => {
      if (!user) {
        throw new NotFoundError('При поиске пользователя произошла ошибка');
      }
      res.send(user)
    })
    .catch(next);
};
