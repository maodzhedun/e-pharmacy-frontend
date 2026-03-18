'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts, useDeleteProduct } from '@/hooks/usePharmacy';
import { useModal } from '@/hooks/useModal';
import type { Product } from '@/types';
import NameFilter from '@/components/Filter/NameFilter';
import ProductsTable from '@/components/Tables/ProductsTable';
import ProductFormModal from '@/components/forms/ProductFormModal';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/ui/Loader';

export default function ProductsClient() {
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const addModal = useModal();
  const editModal = useModal();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { mutate: deleteProduct } = useDeleteProduct();

  const { data, isLoading, isFetching } = useProducts({
    page, limit: 5, name: filterName || undefined,
  });

  const handleFilter = (name: string) => { setFilterName(name); setPage(1); };
  const handleEdit = (p: Product) => { setEditProduct(p); editModal.open(); };
  const handleDelete = (id: string) => { if (confirm('Delete this product?')) deleteProduct(id); };

  return (
    <div>
      {/* Filter + Add — column on <375, row on sm+ */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <NameFilter placeholder="Product Name" onFilter={handleFilter} />
        <button
          onClick={addModal.open}
          className="flex items-center gap-2 self-start text-sm text-text sm:self-auto"
        >
          <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary text-white sm:h-[40px] sm:w-[40px]">
            <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
          </span>
          Add a new product
        </button>
      </div>

      {(isLoading || isFetching) ? (
        <div className="flex justify-center py-20"><Loader size="lg" /></div>
      ) : data ? (
        <>
          <ProductsTable products={data.products} onEdit={handleEdit} onDelete={handleDelete} />
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      ) : null}

      <ProductFormModal isOpen={addModal.isOpen} onClose={addModal.close} />
      {editProduct && (
        <ProductFormModal
          key={editProduct._id}
          isOpen={editModal.isOpen}
          onClose={() => { editModal.close(); setEditProduct(null); }}
          product={editProduct}
        />
      )}
    </div>
  );
}
