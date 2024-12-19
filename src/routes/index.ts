import { Router } from 'express';
import { userRouter } from './users';
import { ApiError } from '../utils';
import { NOT_FOUND, OK } from '../shared';

const router = Router();

router.get('/health', (_, res) => {
  res.status(OK).json({ message: `I'm healthy 🤸‍♂️` });
});

router.use('/auth', userRouter);

router.use('*', (request, res, next) => {
  return next(new ApiError(`The route ${request.originalUrl} can't be found`, NOT_FOUND));
});

export default router;
