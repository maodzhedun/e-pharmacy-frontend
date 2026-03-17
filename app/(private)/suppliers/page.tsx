import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchSuppliers } from '@/services/serverApi';
import { pharmacyKeys } from '@/hooks/usePharmacy';
import SuppliersClient from './SuppliersClient';

export const metadata: Metadata = { title: 'All Suppliers' };

export default async function SuppliersPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: pharmacyKeys.suppliers({ page: 1, limit: 5 }),
    queryFn: () => fetchSuppliers({ page: 1, limit: 5 }),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}><SuppliersClient /></HydrationBoundary>;
}