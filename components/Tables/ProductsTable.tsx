'use client';

import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '@/types';

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary-light px-4 py-2.5 sm:px-5 sm:py-3">
        <h3 className="text-sm font-semibold text-text sm:text-base">All products</h3>
      </div>
      {!products.length ? (
        <p className="px-5 py-10 text-center text-text-light">No products found</p>
      ) : (
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border-light text-left text-xs text-text-light">
              <th className="px-4 py-2 font-normal sm:px-5">Product Info</th>
              <th className="px-4 py-2 font-normal sm:px-5">Category</th>
              <th className="px-4 py-2 font-normal sm:px-5">Stock</th>
              <th className="px-4 py-2 font-normal sm:px-5">Suppliers</th>
              <th className="px-4 py-2 font-normal sm:px-5">Price</th>
              <th className="px-4 py-2 font-normal sm:px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-border-light last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-text sm:px-5">{p.name}</td>
                <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{p.category}</td>
                <td className="px-4 py-3 text-sm text-text sm:px-5">{p.stock}</td>
                <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{p.suppliers}</td>
                <td className="px-4 py-3 text-sm font-medium text-text sm:px-5">{p.price}</td>
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary-light">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => onDelete(p._id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-danger/30 text-danger transition-colors hover:bg-danger-light">
                      <Trash2 size={14} />
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
