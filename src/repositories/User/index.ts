import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../../database';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({ data });
  }

  findOne(query: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({ where: query });
  }
}

export const userRepository = new UserRepository(prismaClient.getClient());
