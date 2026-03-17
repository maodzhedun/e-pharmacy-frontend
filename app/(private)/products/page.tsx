import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchProducts } from '@/services/serverApi';
import { pharmacyKeys } from '@/hooks/usePharmacy';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = { title: 'All Products' };

export default async function ProductsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: pharmacyKeys.products({ page: 1, limit: 5 }),
    queryFn: () => fetchProducts({ page: 1, limit: 5 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsClient />
    </HydrationBoundary>
  );
}
