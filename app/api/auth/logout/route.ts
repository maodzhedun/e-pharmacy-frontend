import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (token) {
      await api.post('/user/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    cookieStore.delete('accessToken');
    return NextResponse.json({ success: true });
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    return NextResponse.json({ success: true });
  }
}
