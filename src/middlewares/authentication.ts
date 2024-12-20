import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { ApiError, Jwt } from '../utils';
import { UNAUTHORIZED } from '../shared';
import { IDecodedToken } from '../interfaces';

export const isAuth = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] as string;

  if (!token) {
    return next(new ApiError('Token is required', UNAUTHORIZED));
  }

  const decodedToken = Jwt.verify(token) as IDecodedToken;

  if (!decodedToken) {
    return next(new ApiError('Invalid token', UNAUTHORIZED));
  }

  req.user = { uuid: decodedToken.payload };

  next();
});
