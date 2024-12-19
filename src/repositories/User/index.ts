import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({ data });
  }

  findOne(query: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({ where: query });
  }
}

export const userRepository = new UserRepository(prisma);
