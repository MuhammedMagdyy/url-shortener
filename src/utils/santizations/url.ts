import { Url } from '@prisma/client';

export const santizeUrl = (url: Url) => {
  return {
    uuid: url.uuid,
    url: url.url,
    shortCode: url.shortCode,
    shortUrl: `${process.env.BASE_URL}/api/v1/url/${url.shortCode}`,
  };
};
