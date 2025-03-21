import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../database';

export class VistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.VisitUncheckedCreateInput) {
    return this.prisma.visit.create({ data });
  }

  findOne(query: Prisma.VisitWhereInput) {
    return this.prisma.visit.findFirst({ where: query });
  }

  findMany(query: Prisma.VisitWhereInput) {
    return this.prisma.visit.findMany({ where: query });
  }

  updateMany(
    query: Prisma.VisitWhereInput,
    data: Prisma.VisitUncheckedUpdateInput,
  ) {
    return this.prisma.visit.updateMany({ where: query, data });
  }
}

export const vistRepository = new VistRepository(prismaClient.getClient());
