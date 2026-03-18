'use client';

import { useDashboard } from '@/hooks/usePharmacy';
import Statistics from '@/components/Dashboard/Statistics';
import DashboardChart from '@/components/Dashboard/DashboardChart';
import RecentCustomers from '@/components/Dashboard/RecentCustomers';
import IncomeExpenses from '@/components/Dashboard/IncomeExpenses';
import Loader from '@/components/ui/Loader';

export default function DashboardClient() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <div className="flex justify-center py-20"><Loader size="lg" /></div>;
  if (!data) return <p className="py-10 text-center text-text-light">Failed to load data</p>;

  return (
    <div>
      <Statistics products={data.statistics.products} suppliers={data.statistics.suppliers} customers={data.statistics.customers} />
      <DashboardChart data={data.incomeExpenses} />
      <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-2">
        <RecentCustomers customers={data.recentCustomers} />
        <IncomeExpenses data={data.incomeExpenses} />
      </div>
    </div>
  );
}
