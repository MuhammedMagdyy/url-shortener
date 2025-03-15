import { IAuthBody } from '../interfaces';
import { hashingService, jwtService, userService } from '../services';
import { ApiError, CONFLICT, logger, UNAUTHORIZED } from '../utils';

export class AuthService {
  async register(payload: IAuthBody) {
    const isUserFound = await userService.findOne({
      username: payload.username,
    });

    if (isUserFound) {
      throw new ApiError('User already exists', CONFLICT);
    }

    const hashedUserPassword = await hashingService.hash(payload.password);
    const user = await userService.createOne({
      username: payload.username,
      password: hashedUserPassword,
    });
    const token = jwtService.generateAccessToken({ uuid: user.uuid });

    logger.info(`User ${user.username} registered successfully`);

    return { user, token };
  }

  async login(payload: IAuthBody) {
    const isUserFound = await userService.findOne({
      username: payload.username,
    });

    if (!isUserFound) {
      throw new ApiError('Invalid username or password', UNAUTHORIZED);
    }

    const isPasswordMatch = await hashingService.compare(
      payload.password,
      isUserFound.password,
    );

    if (!isPasswordMatch) {
      throw new ApiError('Invalid username or password', UNAUTHORIZED);
    }

    const token = jwtService.generateAccessToken({ uuid: isUserFound.uuid });

    logger.info(`User ${isUserFound.username} logged in successfully`);

    return token;
  }
}

export const authService = new AuthService();
