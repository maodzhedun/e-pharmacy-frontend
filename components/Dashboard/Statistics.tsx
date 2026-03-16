import { Package, Truck, Users } from 'lucide-react';

interface Props {
  products: number;
  suppliers: number;
  customers: number;
}

const STATS = [
  {
    key: 'products',
    icon: Package,
    label: 'All products',
    color: 'bg-primary/10 text-primary',
  },
  {
    key: 'suppliers',
    icon: Truck,
    label: 'All suppliers',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    key: 'customers',
    icon: Users,
    label: 'All customers',
    color: 'bg-info-light text-info',
  },
] as const;

export default function Statistics({ products, suppliers, customers }: Props) {
  const values = { products, suppliers, customers } as const;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {STATS.map(({ key, icon: Icon, label, color }) => (
        <div
          key={key}
          className="flex items-center gap-4 rounded-2xl border border-border-light bg-white p-5 shadow-sm"
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
          >
            <Icon size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text">{values[key]}</p>
            <p className="text-sm text-text-secondary">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
