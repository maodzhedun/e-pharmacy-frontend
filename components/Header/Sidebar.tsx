'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  Truck,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/customers', icon: Users, label: 'Customers' },
  { path: '/suppliers', icon: Truck, label: 'Suppliers' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[72px] flex-col items-center bg-bg-dark pt-6 md:w-[80px]">
      <nav className="mt-4 w-full px-2">
        <ul className="flex flex-col items-center gap-1">
          {NAV_ITEMS.map(({ path, icon: IconComponent, label }) => {
            const isActive =
              pathname === path || pathname.startsWith(path + '/');
            return (
              <li key={path}>
                <Link
                  href={path}
                  title={label}
                  className={clsx(
                    'flex h-12 w-12 items-center justify-center rounded-xl transition-colors md:h-14 md:w-14',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  )}
                >
                  <IconComponent size={20} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
