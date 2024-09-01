import { User } from './user';

export type AuthResponse = {
  user: User;
  accessToken: string;
};
