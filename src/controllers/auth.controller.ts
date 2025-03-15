import asyncHandler from 'express-async-handler';
import { IAuthBody } from '../interfaces';
import { authService } from '../services';
import {
  CREATED,
  loginSchema,
  OK,
  registerSchema,
  santizeUser,
} from '../utils';

export const register = asyncHandler(async (req, res) => {
  const payload = registerSchema.parse(req.body) as IAuthBody;
  const { user, token } = await authService.register(payload);

  res.status(CREATED).json({
    message: 'Registered successfully!',
    data: santizeUser(user),
    token,
  });
});

export const login = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body) as IAuthBody;
  const token = await authService.login(payload);

  res.status(OK).json({ message: 'Logged in successfully!', token });
});
