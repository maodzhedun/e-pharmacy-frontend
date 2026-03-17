'use client';

import { useState } from 'react';
import { useOrders } from '@/hooks/usePharmacy';
import NameFilter from '@/components/Filter/NameFilter';
import OrdersTable from '@/components/Tables/OrdersTable';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/ui/Loader';

export default function OrdersClient() {
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState('');

  const { data, isLoading, isFetching } = useOrders({
    page,
    limit: 5,
    name: filterName || undefined,
  });

  const handleFilter = (name: string) => {
    setFilterName(name);
    setPage(1);
  };

  return (
    <div>
      <NameFilter placeholder="User Name" onFilter={handleFilter} />
      {isLoading || isFetching ? (
        <div className="flex justify-center py-20">
          <Loader size="lg" />
        </div>
      ) : data ? (
        <>
          <OrdersTable orders={data.orders} />
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : null}
    </div>
  );
}
