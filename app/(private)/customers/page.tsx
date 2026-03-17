import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchCustomers } from '@/services/serverApi';
import { pharmacyKeys } from '@/hooks/usePharmacy';
import CustomersClient from './CustomersClient';

export const metadata: Metadata = { title: 'Customers Data' };

export default async function CustomersPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: pharmacyKeys.customers({ page: 1, limit: 5 }),
    queryFn: () => fetchCustomers({ page: 1, limit: 5 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomersClient />
    </HydrationBoundary>
  );
}
