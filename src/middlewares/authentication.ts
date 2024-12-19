import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ApiError, Jwt } from '../utils';
import { JwtPayload } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../shared';

export const isAuth = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] as string;

  if (!token) {
    return next(new ApiError('Token is required', UNAUTHORIZED));
  }

  const decodedToken = Jwt.verify(token);

  if (!decodedToken) {
    return next(new ApiError('Invalid token', UNAUTHORIZED));
  }

  res.locals.user = decodedToken as JwtPayload;
  next();
});
