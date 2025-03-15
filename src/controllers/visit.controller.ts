import asyncHandler from 'express-async-handler';
import { urlService, vistService } from '../services';
import { ApiError, NOT_FOUND, OK } from '../utils';

export const analytics = asyncHandler(async (req, res, next) => {
  const { code } = req.params;

  const url = await urlService.findOne({ shortCode: code });

  if (!url) {
    return next(new ApiError('URL does not exists', NOT_FOUND));
  }

  const visits = await vistService.findMany({ urlUuid: url.uuid });

  res.status(OK).json({ message: 'URL analytics', data: visits });
});
