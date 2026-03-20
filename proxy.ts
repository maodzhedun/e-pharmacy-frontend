import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/dashboard', '/orders', '/products', '/suppliers', '/customers'];
const publicRoutes = ['/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));

  // No tokens at all — redirect to login
  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Has token — redirect away from login
  if ((accessToken || refreshToken) && isPublicRoute) {
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
