import { compare, hash } from 'bcryptjs';

export class HashingService {
  async hash(text: string) {
    return hash(text, Number(process.env.SALT_ROUNDS));
  }

  async compare(text: string, hashedText: string) {
    return compare(text, hashedText);
  }
}

export const hashingService = new HashingService();
