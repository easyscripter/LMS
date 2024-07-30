import { db } from '@/lib/db';
import { userService } from '@/services';
import { loginSchema } from '@/validationSchemas';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    Credentials({
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        let user = null;

        const { username, password } = loginSchema.parse(credentials);

        user = await userService.getUser(username);

        if (!user) {
          throw new Error('User not found.');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Incorrect password.');
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          username: token.username,
        },
      };
    },
  },
};
