'use client';

import { Pencil, Trash2, Plus } from 'lucide-react';
import type { Product } from '@/types';
import Button from '@/components/ui/Button';

interface Props {
  products: Product[];
  onAdd: () => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsTable({
  products,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-lg font-semibold text-text">All products</h3>
        <Button size="sm" onClick={onAdd}>
          <Plus size={16} className="mr-1" />
          Add a new product
        </Button>
      </div>
      {!products.length ? (
        <p className="px-5 pb-8 text-center text-text-light">
          No products found
        </p>
      ) : (
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-y border-border-light text-left text-xs font-medium uppercase tracking-wider text-text-light">
              <th className="px-4 py-3">Product Info</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Suppliers</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr
                key={p._id}
                className="border-b border-border-light transition-colors last:border-0 hover:bg-border-light/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.photo && (
                      <img
                        src={p.photo}
                        alt=""
                        className="h-9 w-9 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {p.category}
                </td>
                <td className="px-4 py-3 text-sm">{p.stock}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {p.suppliers}
                </td>
                <td className="px-4 py-3 text-sm font-medium">${p.price}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-primary-light hover:text-primary"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(p._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-danger-light hover:text-danger"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
