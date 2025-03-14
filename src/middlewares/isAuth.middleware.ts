import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IDecodedToken } from '../interfaces';
import { ApiError, FORBIDDEN, Jwt, UNAUTHORIZED } from '../utils';

export const isAuth = asyncHandler(
  (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] as string;

    if (!token) {
      return next(new ApiError('Token is required', UNAUTHORIZED));
    }

    const decodedToken = Jwt.verify(token) as IDecodedToken;

    if (!decodedToken) {
      return next(new ApiError('Invalid token', FORBIDDEN));
    }

    req.user = { uuid: decodedToken.uuid };

    next();
  },
);
