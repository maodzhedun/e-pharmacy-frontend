import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchOrders } from '@/services/serverApi';
import { pharmacyKeys } from '@/hooks/usePharmacy';
import OrdersClient from './OrdersClient';

export const metadata: Metadata = { title: 'All Orders' };

export default async function OrdersPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: pharmacyKeys.orders({ page: 1, limit: 5 }),
    queryFn: () => fetchOrders({ page: 1, limit: 5 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersClient />
    </HydrationBoundary>
  );
}
