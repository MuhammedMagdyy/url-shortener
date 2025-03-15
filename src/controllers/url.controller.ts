import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { v4 as uuid } from 'uuid';
import { IAxiosIpInfo } from '../interfaces';
import { urlService, vistService } from '../services';
import {
  ApiError,
  createUrlSchema,
  NOT_FOUND,
  OK,
  santizeUrl,
  uuidToBase62,
} from '../utils';

export const shortenUrl = asyncHandler(async (req, res, _next) => {
  const { url } = createUrlSchema.parse(req.body);
  const userUuid = req.user?.uuid as string;

  const existing = await urlService.findOne({ url, userUuid });

  if (existing) {
    res
      .status(OK)
      .json({ message: 'URL already exists!', data: santizeUrl(existing) });
    return;
  }

  const randomUUID = uuid();
  const shortCode = uuidToBase62(randomUUID);

  const createdURL = await urlService.createOne({ url, shortCode, userUuid });

  res
    .status(OK)
    .json({ message: 'URL created successfully!', data: createdURL });
});

export const redirectUrl = asyncHandler(async (req, res, next) => {
  const code = req.params.code;
  const existingUrl = await urlService.findOne({ shortCode: code });

  if (!existingUrl) {
    return next(new ApiError('URL does not exists', NOT_FOUND));
  }

  const ip = req.ip as string;
  const ipApiBaseUrl = `https://ipapi.co/${ip}/json`;
  const data = await axios.get(ipApiBaseUrl);
  const { city, region, country_name } = data.data as IAxiosIpInfo;

  const existingVisit = await vistService.findOne({
    urlUuid: existingUrl.uuid,
    userIp: ip,
  });

  if (!existingVisit) {
    await vistService.createOne({
      urlUuid: existingUrl.uuid,
      userIp: ip,
      location: `${city}, ${region}, ${country_name}`,
    });
  } else {
    await vistService.updateMany(
      { urlUuid: existingUrl.uuid, userIp: ip },
      {
        accessedAt: new Date(),
        userIp: ip,
        location: `${city}, ${region}, ${country_name}`,
      },
    );
  }

  res.redirect(existingUrl.url);
});
