import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.post('/user/login', body);

    const cookieStore = await cookies();

    cookieStore.set('accessToken', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({
      _id: data.user?._id,
      name: data.user?.name || 'Admin',
      email: data.user?.email || body.email,
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}
