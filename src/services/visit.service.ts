import { Prisma } from '@prisma/client';
import { vistRepository, VistRepository } from '../repositories';
import { urlService } from '../services';
import { ApiError, logger, NOT_FOUND } from '../utils';

export class VistService {
  constructor(private readonly vistRepository: VistRepository) {}

  async createOne(data: Prisma.VisitUncheckedCreateInput) {
    return this.vistRepository.createOne(data);
  }

  async findOne(query: Prisma.VisitWhereInput) {
    return this.vistRepository.findOne(query);
  }

  async findMany(query: Prisma.VisitWhereInput) {
    return this.vistRepository.findMany(query);
  }

  async updateMany(
    query: Prisma.VisitWhereInput,
    data: Prisma.VisitUncheckedUpdateInput,
  ) {
    return this.vistRepository.updateMany(query, data);
  }

  async getVisits(shortCode: string) {
    const url = await urlService.findOne({ shortCode });

    if (!url) {
      logger.error(`URL with code [${shortCode}] doesn't exists`);
      throw new ApiError('URL does not exists', NOT_FOUND);
    }

    return this.findMany({ urlUuid: url.uuid });
  }
}

export const vistService = new VistService(vistRepository);
