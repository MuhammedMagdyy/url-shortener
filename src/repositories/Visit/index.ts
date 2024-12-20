import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class VistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.VisitUncheckedCreateInput) {
    return this.prisma.visit.create({ data });
  }

  findOne(query: Prisma.VisitWhereInput) {
    return this.prisma.visit.findFirst({ where: query });
  }

  findMany(
    query: Prisma.VisitWhereInput,
    options: Prisma.VisitFindManyArgs['include'] = {
      url: true,
    },
  ) {
    return this.prisma.visit.findMany({ where: query, include: options });
  }

  updateMany(query: Prisma.VisitWhereInput, data: Prisma.VisitUncheckedUpdateInput) {
    return this.prisma.visit.updateMany({ where: query, data });
  }
}

export const vistRepository = new VistRepository(prisma);
