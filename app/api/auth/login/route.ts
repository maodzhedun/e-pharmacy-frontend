import { NextRequest, NextResponse } from 'next/server';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post('/user/login', body);

    const res = NextResponse.json({
      _id: response.data.user?._id,
      name: response.data.user?.name || 'Admin',
      email: response.data.user?.email || body.email,
    });

    const isProduction = process.env.NODE_ENV === 'production';

    // Parse backend Set-Cookie and re-create with correct SameSite for environment
    const setCookies = response.headers['set-cookie'];
    if (setCookies) {
      const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
      for (const raw of cookieArray) {
        const parts = raw.split(';').map((s: string) => s.trim());
        const [nameValue] = parts;
        const [name, ...valueParts] = nameValue.split('=');
        const value = valueParts.join('=');

        // Extract Max-Age
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

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}
