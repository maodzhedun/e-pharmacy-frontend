// services/serverApi.ts — for Server Components with cookie support

import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import type { DashboardData, ProductsResponse, OrdersResponse, SuppliersResponse, CustomersResponse, ListFilters } from '@/types';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const headers: Record<string, string> = {};

  // Forward cookies
  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
  if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`);
  if (sessionId) cookieParts.push(`sessionId=${sessionId}`);
  if (cookieParts.length > 0) {
    headers['Cookie'] = cookieParts.join('; ');
  }

  // Also Bearer header
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
}

export async function fetchDashboard(): Promise<DashboardData> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/dashboard', { headers });
  return data;
}

export async function fetchOrders(filters?: ListFilters): Promise<OrdersResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/orders', { params: filters, headers });
  return data;
}

export async function fetchProducts(filters?: ListFilters): Promise<ProductsResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/products', { params: filters, headers });
  return data;
}

export async function fetchSuppliers(filters?: ListFilters): Promise<SuppliersResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/suppliers', { params: filters, headers });
  return data;
}

export async function fetchCustomers(filters?: ListFilters): Promise<CustomersResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/customers', { params: filters, headers });
  return data;
}
