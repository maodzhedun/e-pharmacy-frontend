'use client';

import { Pencil, Plus } from 'lucide-react';
import type { Supplier } from '@/types';
import Button from '@/components/ui/Button';
import StatusBadge from './StatusBadge';

interface Props {
  suppliers: Supplier[];
  onAdd: () => void;
  onEdit: (s: Supplier) => void;
}

export default function SuppliersTable({ suppliers, onAdd, onEdit }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-lg font-semibold text-text">All suppliers</h3>
        <Button size="sm" onClick={onAdd}>
          <Plus size={16} className="mr-1" />
          Add a new supplier
        </Button>
      </div>
      {!suppliers.length ? (
        <p className="px-5 pb-8 text-center text-text-light">
          No suppliers found
        </p>
      ) : (
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-y border-border-light text-left text-xs font-medium uppercase tracking-wider text-text-light">
              <th className="px-4 py-3">Suppliers Info</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Delivery date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr
                key={s._id}
                className="border-b border-border-light transition-colors last:border-0 hover:bg-border-light/50"
              >
                <td className="px-4 py-3 text-sm font-medium">{s.name}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {s.address}
                </td>
                <td className="px-4 py-3 text-sm">{s.suppliers}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {s.date}
                </td>
                <td className="px-4 py-3 text-sm font-medium">{s.amount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onEdit(s)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-primary-light hover:text-primary"
                  >
                    <Pencil size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
