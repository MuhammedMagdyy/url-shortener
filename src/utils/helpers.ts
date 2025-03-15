import { nanoid } from 'nanoid';
import { ApiError, BAD_REQUEST, logger } from '../utils';

export const generateUniqueId = (length = 6): string => {
  if (length < 6) {
    logger.error('Length must be greater than 6');
    throw new ApiError('Length must be greater than 6', BAD_REQUEST);
  }

  return nanoid(length);
};
