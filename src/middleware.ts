import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { Routes } from './enums';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith(Routes.SIGN_IN) && isAuthenticated) {
    return NextResponse.redirect(new URL(Routes.DASHBOARD, req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: Routes.SIGN_IN,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
