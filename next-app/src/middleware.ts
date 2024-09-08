import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_TOKEN } from './constants';
import { Routes } from './enums';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if (refreshToken === undefined) {
    return NextResponse.redirect(new URL(Routes.SIGN_IN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|sign-in|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
