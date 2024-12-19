import { User } from '@prisma/client';

export const santizeUser = (user: User) => {
  return {
    uuid: user.uuid,
    username: user.username,
  };
};
