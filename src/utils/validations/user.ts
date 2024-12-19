import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(4, { message: 'First name is too short' }).trim(),
  password: z.string().min(6, { message: 'Password is too short' }).trim(),
});

export const loginSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});
