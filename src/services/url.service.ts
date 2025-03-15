import { Prisma } from '@prisma/client';
import axios from 'axios';
import { IAxiosIpInfo } from '../interfaces';
import { urlRepository, UrlRepository } from '../repositories';
import { vistService } from '../services';
import { ApiError, generateUniqueId, logger, NOT_FOUND } from '../utils';

export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createOne(data: Prisma.UrlUncheckedCreateInput) {
    return this.urlRepository.createOne(data);
  }

  async findOne(query: Prisma.UrlWhereInput) {
    return this.urlRepository.findOne(query);
  }

  async generateShortLink(url: string, userUuid: string) {
    const urlExists = await this.findOne({ url, userUuid });

    if (urlExists) {
      logger.info(
        `URL [${url}] already exists!, short code [${urlExists.shortCode}]`,
      );
      return { data: urlExists, isNew: false };
    }

    const shortCode = generateUniqueId();
    const createdUrl = await this.createOne({ url, shortCode, userUuid });

    logger.info(
      `URL [${url}] created successfully!, short code [${shortCode}]`,
    );

    return { data: createdUrl, isNew: true };
  }

  async trackVisit(code: string, ip: string) {
    const location = await this.generateIpLocation(ip);
    const existingUrl = await this.findOne({ shortCode: code });

    if (!existingUrl) {
      logger.error(`URL with code [${code}] doesn't exists`);
      throw new ApiError('URL does not exists', NOT_FOUND);
    }

    const existingVisit = await vistService.findOne({
      urlUuid: existingUrl.uuid,
      userIp: ip,
    });

    if (!existingVisit) {
      logger.info(`Creating visit for URL with code [${code}]`);
      await vistService.createOne({
        urlUuid: existingUrl.uuid,
        userIp: ip,
        location,
      });
    } else {
      logger.info(`Updating visit for URL with code [${code}]`);
      const now = new Date();
      await vistService.updateMany(
        { urlUuid: existingUrl.uuid, userIp: ip },
        { accessedAt: now, userIp: ip, location },
      );
    }

    return existingUrl.url;
  }

  private async generateIpLocation(ip: string) {
    const ipApiBaseUrl = `https://ipapi.co/${ip}/json`;
    const { data } = await axios.get(ipApiBaseUrl);
    const { city, region, country_name } = data as IAxiosIpInfo;

    return `${city}, ${region}, ${country_name}`;
  }
}

export const urlService = new UrlService(urlRepository);
