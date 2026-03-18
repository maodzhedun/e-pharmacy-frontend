'use client';

import { useState } from 'react';
import { useCustomers } from '@/hooks/usePharmacy';
import NameFilter from '@/components/Filter/NameFilter';
import CustomersTable from '@/components/Tables/CustomersTable';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/ui/Loader';

export default function CustomersClient() {
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState('');

  const { data, isLoading, isFetching } = useCustomers({
    page, limit: 5, name: filterName || undefined,
  });

  const handleFilter = (name: string) => { setFilterName(name); setPage(1); };

  return (
    <div>
      <div className="mb-4 sm:mb-5">
        <NameFilter placeholder="User Name" onFilter={handleFilter} />
      </div>
      {(isLoading || isFetching) ? (
        <div className="flex justify-center py-20"><Loader size="lg" /></div>
      ) : data ? (
        <>
          <CustomersTable customers={data.customers} />
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </div>
  );
}
