'use client';

import { useState } from 'react';
import { useSuppliers } from '@/hooks/usePharmacy';
import { useModal } from '@/hooks/useModal';
import type { Supplier } from '@/types';
import NameFilter from '@/components/Filter/NameFilter';
import SuppliersTable from '@/components/Tables/SuppliersTable';
import SupplierFormModal from '@/components/forms/SupplierFormModal';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/ui/Loader';

export default function SuppliersClient() {
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const addModal = useModal();
  const editModal = useModal();
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);

  const { data, isLoading, isFetching } = useSuppliers({
    page, limit: 5, name: filterName || undefined,
  });

  const handleFilter = (name: string) => { setFilterName(name); setPage(1); };
  const handleEdit = (s: Supplier) => { setEditSupplier(s); editModal.open(); };

  return (
    <div>
      {/* Filter + Add — column on <375, row on sm+ */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <NameFilter placeholder="User Name" onFilter={handleFilter} />
        <button
          onClick={addModal.open}
          className="self-start rounded-full border border-border px-4 py-2 text-xs text-text transition-colors hover:border-primary hover:text-primary sm:self-auto sm:px-5 sm:text-sm"
        >
          Add a new suppliers
        </button>
      </div>

      {(isLoading || isFetching) ? (
        <div className="flex justify-center py-20"><Loader size="lg" /></div>
      ) : data ? (
        <>
          <SuppliersTable suppliers={data.suppliers} onEdit={handleEdit} />
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      ) : null}

      <SupplierFormModal isOpen={addModal.isOpen} onClose={addModal.close} />
      {editSupplier && (
        <SupplierFormModal
          key={editSupplier._id}
          isOpen={editModal.isOpen}
          onClose={() => { editModal.close(); setEditSupplier(null); }}
          supplier={editSupplier}
        />
      )}
    </div>
  );
}
