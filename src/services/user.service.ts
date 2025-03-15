import { Prisma } from '@prisma/client';
import { userRepository, UserRepository } from '../repositories';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createOne(data: Prisma.UserUncheckedCreateInput) {
    return this.userRepository.createOne(data);
  }

  async findOne(query: Prisma.UserWhereInput) {
    return this.userRepository.findOne(query);
  }
}

export const userService = new UserService(userRepository);
