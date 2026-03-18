import { Package, Users } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  products: number;
  suppliers: number;
  customers: number;
}

const STATS = [
  { key: 'products' as const, icon: Package, label: 'All products', highlight: true },
  { key: 'suppliers' as const, icon: Users, label: 'All suppliers', highlight: false },
  { key: 'customers' as const, icon: Users, label: 'All customers', highlight: false },
];

export default function Statistics({ products, suppliers, customers }: Props) {
  const values = { products, suppliers, customers };

  return (
    <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
      {STATS.map(({ key, icon: Icon, label, highlight }) => (
        <div
          key={key}
          className={clsx(
            'rounded-2xl border bg-white p-3 sm:p-4 md:p-5',
            highlight ? 'border-primary' : 'border-border-light'
          )}
        >
          <div className="mb-2 flex items-center gap-2 sm:mb-3">
            <Icon size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">{label}</span>
          </div>
          <p className="text-xl font-bold text-text sm:text-2xl md:text-3xl">
            {values[key].toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
