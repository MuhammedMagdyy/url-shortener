import { Prisma } from '@prisma/client';
import { vistRepository, VistRepository } from '../../repositories';

export class VistService {
  constructor(private readonly vistRepository: VistRepository) {}

  async createOne(data: Prisma.VisitUncheckedCreateInput) {
    return this.vistRepository.createOne(data);
  }

  async findOne(query: Prisma.VisitWhereInput) {
    return this.vistRepository.findOne(query);
  }

  async findMany(
    query: Prisma.VisitWhereInput,
    options: Prisma.VisitFindManyArgs['include'] = { url: { select: { shortCode: true } } },
  ) {
    return this.vistRepository.findMany(query, options);
  }

  async updateMany(query: Prisma.VisitWhereInput, data: Prisma.VisitUncheckedUpdateInput) {
    return this.vistRepository.updateMany(query, data);
  }
}

export const vistService = new VistService(vistRepository);
