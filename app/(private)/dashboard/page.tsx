import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchDashboard } from '@/services/serverApi';
import { pharmacyKeys } from '@/hooks/usePharmacy';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: pharmacyKeys.dashboard,
    queryFn: fetchDashboard,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
