import { Secret, sign, verify } from 'jsonwebtoken';

export class Jwt {
  static generate(payload: string): string {
    return sign({ payload }, process.env.JWT_SECRET as Secret, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  static verify(token: string) {
    return verify(token, process.env.JWT_SECRET as Secret);
  }
}
