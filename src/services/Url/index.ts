import { Prisma } from '@prisma/client';
import { urlRepository, UrlRepository } from '../../repositories';

export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createOne(data: Prisma.UrlUncheckedCreateInput) {
    return this.urlRepository.createOne(data);
  }

  async findOne(query: Prisma.UrlWhereInput) {
    return this.urlRepository.findOne(query);
  }
}

export const urlService = new UrlService(urlRepository);
