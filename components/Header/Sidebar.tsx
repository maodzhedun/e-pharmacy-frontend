'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { LayoutDashboard, ShoppingCart, User, Package, Users } from 'lucide-react';
import LogoutButton from './LogoutButton';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/products', icon: User, label: 'Products' },
  { path: '/suppliers', icon: Package, label: 'Suppliers' },
  { path: '/customers', icon: Users, label: 'Customers' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 flex h-screen w-[72px] flex-col items-center border-r border-border-light bg-white pt-20 transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Close — mobile/tablet */}
        <button onClick={onClose} className="absolute right-2 top-4 p-1 lg:hidden">
          <X size={20} className="text-text-secondary" />
        </button>

        {/* Navigation */}
        <nav className="mt-4 w-full px-3">
          <ul className="flex flex-col items-center gap-2">
            {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
              const isActive = pathname === path || pathname.startsWith(path + '/');
              return (
                <li key={path}>
                  <Link
                    href={path}
                    title={label}
                    onClick={onClose}
                    className={clsx(
                      'flex h-[44px] w-[44px] items-center justify-center rounded-full transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-border-light text-text-secondary hover:bg-primary-light hover:text-primary'
                    )}
                  >
                    <Icon size={18} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout — bottom, mobile/tablet only */}
        <div className="mt-auto mb-6 lg:hidden">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
