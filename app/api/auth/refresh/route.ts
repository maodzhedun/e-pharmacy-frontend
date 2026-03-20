import { NextRequest, NextResponse } from 'next/server';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

function forwardCookies(
  setCookies: string | string[] | undefined,
  res: NextResponse
) {
  if (!setCookies) return;
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];

  for (const raw of cookieArray) {
    const parts = raw.split(';').map((s: string) => s.trim());
    const [nameValue] = parts;
    const [name, ...valueParts] = nameValue.split('=');
    const value = valueParts.join('=');

    const maxAgePart = parts.find((p: string) => p.toLowerCase().startsWith('max-age='));
    const maxAge = maxAgePart ? parseInt(maxAgePart.split('=')[1]) : 86400;

    res.cookies.set(name, decodeURIComponent(value), {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await api.post('/user/refresh', {}, {
      headers: { Cookie: cookieHeader },
    });

    const res = NextResponse.json({ success: true });
    forwardCookies(response.headers['set-cookie'], res);
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}
