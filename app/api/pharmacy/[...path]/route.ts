import { NextRequest, NextResponse } from 'next/server';
import { api, getErrorMessage, getErrorStatus } from '@/app/api/api';
import { AxiosError, AxiosRequestConfig } from 'axios';

type Props = { params: Promise<{ path: string[] }> };

function getHeaders(request: NextRequest): Record<string, string> {
  const cookieHeader = request.headers.get('cookie') || '';
  const accessToken = request.cookies.get('accessToken')?.value;
  const headers: Record<string, string> = {};
  if (cookieHeader) headers['Cookie'] = cookieHeader;
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
  return headers;
}

function parseCookies(
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

async function proxyRequest(
  method: 'get' | 'post' | 'put' | 'delete',
  apiPath: string,
  request: NextRequest,
  body?: unknown
): Promise<NextResponse> {
  const headers = getHeaders(request);
  const queryParams: Record<string, string> = {};
  request.nextUrl.searchParams.forEach((v, k) => { queryParams[k] = v; });

  const config: AxiosRequestConfig = { headers };
  if (Object.keys(queryParams).length > 0) config.params = queryParams;

  try {
    const resp = (method === 'get' || method === 'delete')
      ? await api[method](apiPath, config)
      : await api[method](apiPath, body || {}, config);
    return NextResponse.json(resp.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      // Try refresh
      try {
        const cookieHeader = request.headers.get('cookie') || '';
        const refreshResp = await api.post('/user/refresh', {}, {
          headers: { Cookie: cookieHeader },
        });

        const newCookies = refreshResp.headers['set-cookie'];
        const newCookieStr = Array.isArray(newCookies) ? newCookies.join('; ') : newCookies || '';
        const accessMatch = newCookieStr.match(/accessToken=([^;]+)/);
        const newToken = accessMatch ? decodeURIComponent(accessMatch[1]) : null;

        if (newToken) {
          const retryHeaders: Record<string, string> = {
            Authorization: `Bearer ${newToken}`,
            Cookie: newCookieStr,
          };
          const retryConfig: AxiosRequestConfig = { headers: retryHeaders };
          if (Object.keys(queryParams).length > 0) retryConfig.params = queryParams;

          const retryResp = (method === 'get' || method === 'delete')
            ? await api[method](apiPath, retryConfig)
            : await api[method](apiPath, body || {}, retryConfig);

          const res = NextResponse.json(retryResp.data);
          parseCookies(newCookies, res);
          return res;
        }
      } catch { /* refresh failed */ }
    }

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) }
    );
  }
}

export async function GET(req: NextRequest, { params }: Props) {
  const { path } = await params;
  return proxyRequest('get', `/${path.join('/')}`, req);
}
export async function POST(req: NextRequest, { params }: Props) {
  const { path } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyRequest('post', `/${path.join('/')}`, req, body);
}
export async function PUT(req: NextRequest, { params }: Props) {
  const { path } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyRequest('put', `/${path.join('/')}`, req, body);
}
export async function DELETE(req: NextRequest, { params }: Props) {
  const { path } = await params;
  return proxyRequest('delete', `/${path.join('/')}`, req);
}
