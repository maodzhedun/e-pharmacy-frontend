import { NextRequest, NextResponse } from 'next/server';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const accessToken = request.cookies.get('accessToken')?.value;

    const headers: Record<string, string> = {};
    if (cookieHeader) headers['Cookie'] = cookieHeader;
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

    const { data } = await api.get('/user/user-info', { headers });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}
