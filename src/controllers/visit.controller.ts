import asyncHandler from 'express-async-handler';
import { vistService } from '../services';
import { OK } from '../utils';

export const analytics = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const visits = await vistService.getVisits(code);

  res.status(OK).json({ message: 'URL analytics', data: visits });
});
