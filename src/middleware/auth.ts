import { NextFunction, Request, Response } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore ВРЕМЕННОЕ РЕШЕНИЕ. id пользователя в объекте запроса req.user._id
  req.user = {
    _id: '65228d5d2b57d792a1e961a2',
  };
  next();
};

export default auth;
