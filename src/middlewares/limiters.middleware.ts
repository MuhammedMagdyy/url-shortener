import { rateLimit } from 'express-rate-limit';
import { TOO_MANY_REQUESTS } from '../utils';

export const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again after 2 minutes',
  handler: (_req, res, _next, options) => {
    res.status(TOO_MANY_REQUESTS).json({
      error: 'Rate limit exceeded',
      details: options.message,
      retryAfter: `${options.windowMs / 1000} seconds`,
    });
  },
});
