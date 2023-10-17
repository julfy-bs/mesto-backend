import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import InvalidAuthentication from '../errors/invalid-authentication';
import { sanitizedConfig } from '../vendor/constants/config';
import { ErrorText } from '../vendor/constants/error-text';

export default (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InvalidAuthentication(ErrorText.ServerRequestsAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload: string | JwtPayload;

  try {
    payload = jwt.verify(token, sanitizedConfig.AUTH_ACCESS_TOKEN_SECRET) as JwtPayload;
  } catch (err) {
    throw new InvalidAuthentication(ErrorText.ServerRequestsAuth);
  }

  request.user = payload;

  next();
};
