import { NextRequest, NextResponse } from 'next/server';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await api.post('/user/logout', {}, {
      headers: { Cookie: cookieHeader },
    });

    const res = NextResponse.json({ success: true });

    // Forward backend's Set-Cookie (clears cookies)
    const setCookies = response.headers['set-cookie'];
    if (setCookies) {
      const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
      cookieArray.forEach((cookie) => {
        res.headers.append('Set-Cookie', cookie);
      });
    }

    // Also explicitly clear frontend cookies
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    res.cookies.delete('sessionId');

    return res;
  } catch (error) {
    // Even on error, clear cookies
    const res = NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    res.cookies.delete('sessionId');
    return res;
  }
}
