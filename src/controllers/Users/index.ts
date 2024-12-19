import asyncHandler from 'express-async-handler';
import { userService } from '../../services';
import { ApiError, Jwt, Password, registerSchema, loginSchema, santizeUser } from '../../utils';
import { CONFLICT, CREATED, OK, UNAUTHORIZED } from '../../shared';

export const register = asyncHandler(async (req, res, next) => {
  const { username, password } = registerSchema.parse(req.body);
  const isExists = await userService.findOne({ username });

  if (isExists) {
    return next(new ApiError('User already exists', CONFLICT));
  }

  const hashedPassword = await Password.hash(password);
  const user = await userService.createOne({ username, password: hashedPassword });
  const token = Jwt.generate(user.uuid);

  res.status(CREATED).json({ message: 'Registered successfully!', data: santizeUser(user), token });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = loginSchema.parse(req.body);
  const user = await userService.findOne({ username });

  if (!user) {
    return next(new ApiError('Invalid username or password', UNAUTHORIZED));
  }

  const isMatch = await Password.isCorrect(password, user.password);

  if (!isMatch) {
    return next(new ApiError('Invalid username or password', UNAUTHORIZED));
  }

  const token = Jwt.generate(user.uuid);

  res.status(OK).json({ message: 'Logged in successfully!', token });
});
