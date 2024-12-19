import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../shared';

type ErrorType = ApiError | ZodError;

export const errorHandler: ErrorRequestHandler = (
  error: ErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ApiError) {
    res.status(error.status).json({ message: error.message });
  } else if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => {
      return {
        field: issue.path.join('.'),
        message: issue.message,
      };
    });
    res.status(BAD_REQUEST).json({ message: 'Validation failed', errors });
  } else {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
