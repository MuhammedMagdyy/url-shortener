import { hash, compare } from 'bcryptjs';

export class Password {
  static hash(password: string): Promise<string> {
    return hash(password, Number(process.env.SALT_ROUNDS));
  }

  static isCorrect(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
