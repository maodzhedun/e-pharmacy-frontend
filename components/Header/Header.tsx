/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from './Sidebar';
import LogoutButton from './LogoutButton';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/orders': 'All orders',
  '/products': 'All products',
  '/suppliers': 'All suppliers',
  '/customers': 'All customers',
};

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="ml-0 flex h-[56px] items-center justify-between border-b border-border-light bg-white px-4 sm:h-[60px] sm:px-5 lg:ml-[72px] md:h-[72px] md:px-8">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger — mobile/tablet */}
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu size={22} className="text-text sm:h-6 sm:w-6" />
          </button>

          {/* Logo + subtitle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link href="/dashboard">
              <img src="/images/logo.svg" alt="" width={32} height={32} className="sm:h-9 sm:w-9" />
            </Link>
            <div>
              <Link href="/dashboard" className="text-base font-bold text-text sm:text-lg">
                Medicine store
              </Link>
              <p className="text-[10px] text-text-secondary sm:text-xs">
                {pageTitle} | {user?.email || 'vendor@gmail.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Logout — desktop only */}
        <div className="hidden lg:block">
          <LogoutButton />
        </div>
      </header>
    </>
  );
}
