import { Secret, sign, verify } from 'jsonwebtoken';
import { IDecodedToken } from '../interfaces';

export class JwtService {
  generateAccessToken(
    { exp: _exp, iat: _iat, ...payload }: IDecodedToken,
    expiresIn = process.env.JWT_EXPIRATION,
  ) {
    return sign(payload, process.env.JWT_SECRET as Secret, {
      expiresIn,
    });
  }

  verify(token: string): IDecodedToken {
    return verify(token, process.env.JWT_SECRET as Secret) as IDecodedToken;
  }
}

export const jwtService = new JwtService();
