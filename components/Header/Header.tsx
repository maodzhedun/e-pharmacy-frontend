/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, LogOut } from 'lucide-react';
import { useAuth, useLogout } from '@/hooks/useAuth';
import Sidebar from './Sidebar';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/orders': 'All orders',
  '/products': 'All products',
  '/suppliers': 'All suppliers',
  '/customers': 'All customers',
};

export default function Header() {
  const { user } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="ml-0 flex h-[56px] items-center justify-between border-b border-border-light bg-white px-4 sm:h-[60px] sm:px-5 md:ml-[72px] md:h-[72px] md:px-8">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger — mobile only */}
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu size={22} className="text-text sm:h-6 sm:w-6" />
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-1.5 sm:gap-2">
            <img src="/images/logo.svg" alt="" width={32} height={32} className="sm:h-9 sm:w-9" />
            <span className="text-base font-bold text-text sm:text-lg">Medicine store</span>
          </Link>

          {/* Subtitle + email — tablet+ */}
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-text-light">|</span>
            <span className="text-sm text-text-secondary">{pageTitle}</span>
            <span className="text-text-light">|</span>
            <span className="text-sm text-text-secondary">{user?.email || 'vendor@gmail.com'}</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:h-[40px] sm:w-[40px]"
          title="Logout"
        >
          <LogOut size={16} className="sm:h-[18px] sm:w-[18px]" />
        </button>
      </header>
    </>
  );
}
