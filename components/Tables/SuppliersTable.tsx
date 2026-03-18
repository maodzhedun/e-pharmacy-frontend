'use client';

import { Pencil } from 'lucide-react';
import type { Supplier } from '@/types';
import StatusBadge from './StatusBadge';

interface Props {
  suppliers: Supplier[];
  onEdit: (s: Supplier) => void;
}

export default function SuppliersTable({ suppliers, onEdit }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary-light px-4 py-2.5 sm:px-5 sm:py-3">
        <h3 className="text-sm font-semibold text-text sm:text-base">All suppliers</h3>
      </div>
      {!suppliers.length ? (
        <p className="px-5 py-10 text-center text-text-light">No suppliers found</p>
      ) : (
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border-light text-left text-xs text-text-light">
              <th className="px-4 py-2 font-normal sm:px-5">Suppliers Info</th>
              <th className="px-4 py-2 font-normal sm:px-5">Address</th>
              <th className="px-4 py-2 font-normal sm:px-5">Company</th>
              <th className="px-4 py-2 font-normal sm:px-5">Delivery date</th>
              <th className="px-4 py-2 font-normal sm:px-5">Ammount</th>
              <th className="px-4 py-2 font-normal sm:px-5">Status</th>
              <th className="px-4 py-2 font-normal sm:px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id} className="border-b border-border-light last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-text sm:px-5">{s.name}</td>
                <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{s.address}</td>
                <td className="px-4 py-3 text-sm text-text sm:px-5">{s.suppliers}</td>
                <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{s.date}</td>
                <td className="px-4 py-3 text-sm font-medium text-text sm:px-5">{s.amount}</td>
                <td className="px-4 py-3 sm:px-5"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 sm:px-5">
                  <button onClick={() => onEdit(s)} className="flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary-light">
                    <Pencil size={12} />
                    Edit
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
