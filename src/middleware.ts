import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { Routes } from './enums';
import { Role } from '@prisma/client';

export default withAuth(
  function middleware(req) {
    const { role } = req.nextauth.token ?? {};

    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL(Routes.SIGN_IN, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === Role.STUDENT,
    },
  },
);

export const config = {
  matcher: ['/dashboard/:path*'], // Укажите защищенные пути
};
