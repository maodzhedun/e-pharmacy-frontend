import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Session is valid if we have at least a refreshToken
  // (accessToken may have expired but can be refreshed)
  return NextResponse.json({
    authenticated: !!(accessToken || refreshToken),
  });
}
