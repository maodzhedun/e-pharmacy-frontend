import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data } = await api.get('/user/user-info', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}
