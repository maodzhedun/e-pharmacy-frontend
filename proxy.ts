import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = [
  '/dashboard',
  '/orders',
  '/products',
  '/suppliers',
  '/customers',
];
const publicRoutes = ['/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isPrivateRoute = privateRoutes.some(r => pathname.startsWith(r));
  const isPublicRoute = publicRoutes.some(r => pathname.startsWith(r));

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/orders/:path*',
    '/products/:path*',
    '/suppliers/:path*',
    '/customers/:path*',
    '/login',
  ],
};
