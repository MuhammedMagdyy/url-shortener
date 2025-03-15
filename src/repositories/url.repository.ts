import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../database';

export class UrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.UrlUncheckedCreateInput) {
    return this.prisma.url.create({ data });
  }

  findOne(query: Prisma.UrlWhereInput) {
    return this.prisma.url.findFirst({ where: query });
  }
}

export const urlRepository = new UrlRepository(prismaClient.getClient());
