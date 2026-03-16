// services/serverApi.ts

import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import type { DashboardData, ProductsResponse, OrdersResponse, SuppliersResponse, CustomersResponse, ListFilters } from '@/types';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
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