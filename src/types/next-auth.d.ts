import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    role: Role;
  }
  interface Session {
    user: User & {
      username: string;
      role: string;
    };
    token: {
      username: string;
      role: Role;
    };
  }
}
