import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import {
  dashboardApi,
  ordersApi,
  productsApi,
  suppliersApi,
  customersApi,
} from '@/services/clientApi';
import type {
  DashboardData,
  OrdersResponse,
  ProductsResponse,
  SuppliersResponse,
  CustomersResponse,
  Product,
  ProductFormData,
  Supplier,
  SupplierFormData,
  ListFilters,
} from '@/types';

interface ApiErr {
  error?: string;
  message?: string;
}

// ─── Query Keys ────────────────────────────────────────

export const pharmacyKeys = {
  dashboard: ['dashboard'] as const,
  orders: (f?: ListFilters) => ['orders', f?.page, f?.name] as const,
  products: (f?: ListFilters) => ['products', f?.page, f?.name] as const,
  product: (id: string) => ['products', 'detail', id] as const,
  suppliers: (f?: ListFilters) => ['suppliers', f?.page, f?.name] as const,
  customers: (f?: ListFilters) => ['customers', f?.page, f?.name] as const,
};

// ─── Dashboard ─────────────────────────────────────────

export function useDashboard() {
  return useQuery({
    queryKey: pharmacyKeys.dashboard,
    queryFn: async () => {
      const { data } = await dashboardApi.get();
      return data as DashboardData;
    },
    refetchOnMount: false,
  });
}

// ─── Orders ────────────────────────────────────────────

export function useOrders(filters?: ListFilters) {
  return useQuery({
    queryKey: pharmacyKeys.orders(filters),
    queryFn: async () => {
      const { data } = await ordersApi.getAll(filters);
      return data as OrdersResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}

// ─── Products ──────────────────────────────────────────

export function useProducts(filters?: ListFilters) {
  return useQuery({
    queryKey: pharmacyKeys.products(filters),
    queryFn: async () => {
      const { data } = await productsApi.getAll(filters);
      return data as ProductsResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}

export function useAddProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductFormData) => {
      const { data } = await productsApi.create(product);
      return data as Product;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      qc.invalidateQueries({ queryKey: pharmacyKeys.dashboard });
      toast.success('Product added!');
    },
    onError: (e: AxiosError<ApiErr>) => {
      toast.error(e.response?.data?.error || 'Failed to add product');
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ProductFormData>;
    }) => {
      const { data: result } = await productsApi.update(id, data);
      return result as Product;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated!');
    },
    onError: (e: AxiosError<ApiErr>) => {
      toast.error(e.response?.data?.error || 'Failed to update product');
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await productsApi.delete(id);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      qc.invalidateQueries({ queryKey: pharmacyKeys.dashboard });
      toast.success('Product deleted');
    },
    onError: (e: AxiosError<ApiErr>) => {
      toast.error(e.response?.data?.error || 'Failed to delete product');
    },
  });
}

// ─── Suppliers ─────────────────────────────────────────

export function useSuppliers(filters?: ListFilters) {
  return useQuery({
    queryKey: pharmacyKeys.suppliers(filters),
    queryFn: async () => {
      const { data } = await suppliersApi.getAll(filters);
      return data as SuppliersResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}

export function useAddSupplier() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (supplier: SupplierFormData) => {
      const { data } = await suppliersApi.create(supplier);
      return data as Supplier;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suppliers'] });
      qc.invalidateQueries({ queryKey: pharmacyKeys.dashboard });
      toast.success('Supplier added!');
    },
    onError: (e: AxiosError<ApiErr>) => {
      toast.error(e.response?.data?.error || 'Failed to add supplier');
    },
  });
}

export function useUpdateSupplier() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<SupplierFormData>;
    }) => {
      const { data: result } = await suppliersApi.update(id, data);
      return result as Supplier;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier updated!');
    },
    onError: (e: AxiosError<ApiErr>) => {
      toast.error(e.response?.data?.error || 'Failed to update supplier');
    },
  });
}

// ─── Customers ─────────────────────────────────────────

export function useCustomers(filters?: ListFilters) {
  return useQuery({
    queryKey: pharmacyKeys.customers(filters),
    queryFn: async () => {
      const { data } = await customersApi.getAll(filters);
      return data as CustomersResponse;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}
