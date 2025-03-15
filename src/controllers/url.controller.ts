import asyncHandler from 'express-async-handler';
import { urlService } from '../services';
import { CREATED, createUrlSchema, OK } from '../utils';

export const shortenUrl = asyncHandler(async (req, res) => {
  const { url } = createUrlSchema.parse(req.body);
  const userUuid = req.user?.uuid as string;
  const { data: createdURL, isNew } = await urlService.generateShortLink(
    url,
    userUuid,
  );
  const message = isNew ? 'URL created successfully!' : 'URL already exists';
  const statusCode = isNew ? CREATED : OK;

  res.status(statusCode).json({ message, data: createdURL });
});

export const redirectUrl = asyncHandler(async (req, res) => {
  const code = req.params.code;
  const ip = req.ip as string;
  const url = await urlService.trackVisit(code, ip);

  res.redirect(url);
});
