// services/clientApi.ts

import axios from 'axios';
import type {
  DashboardData,
  ProductsResponse,
  OrdersResponse,
  SuppliersResponse,
  CustomersResponse,
  Product,
  ProductFormData,
  Supplier,
  SupplierFormData,
  Customer,
  ListFilters,
} from '@/types';

const clientApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default clientApi;

// ============ Auth API ============
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    clientApi.post('/auth/login', credentials),

  logout: () => clientApi.post('/auth/logout'),

  getSession: () => clientApi.get('/auth/session'),

  getCurrentUser: () => clientApi.get('/users/me'),
};

// ============ Dashboard API ============
export const dashboardApi = {
  get: () => clientApi.get<DashboardData>('/pharmacy/dashboard'),
};

// ============ Orders API ============
export const ordersApi = {
  getAll: (params?: ListFilters) =>
    clientApi.get<OrdersResponse>('/pharmacy/orders', { params }),
};

// ============ Products API ============
export const productsApi = {
  getAll: (params?: ListFilters) =>
    clientApi.get<ProductsResponse>('/pharmacy/products', { params }),

  getById: (id: string) => clientApi.get<Product>(`/pharmacy/products/${id}`),

  create: (data: ProductFormData) =>
    clientApi.post<Product>('/pharmacy/products', data),

  update: (id: string, data: Partial<ProductFormData>) =>
    clientApi.put<Product>(`/pharmacy/products/${id}`, data),

  delete: (id: string) => clientApi.delete(`/pharmacy/products/${id}`),
};

// ============ Suppliers API ============
export const suppliersApi = {
  getAll: (params?: ListFilters) =>
    clientApi.get<SuppliersResponse>('/pharmacy/suppliers', { params }),

  create: (data: SupplierFormData) =>
    clientApi.post<Supplier>('/pharmacy/suppliers', data),

  update: (id: string, data: Partial<SupplierFormData>) =>
    clientApi.put<Supplier>(`/pharmacy/suppliers/${id}`, data),
};

// ============ Customers API ============
export const customersApi = {
  getAll: (params?: ListFilters) =>
    clientApi.get<CustomersResponse>('/pharmacy/customers', { params }),

  getById: (id: string) => clientApi.get<Customer>(`/pharmacy/customers/${id}`),
};
