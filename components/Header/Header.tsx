'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAuth, useLogout } from '@/hooks/useAuth';
import Icon from '@/components/ui/Icon';
import Sidebar from './Sidebar';

export default function Header() {
  const { user } = useAuth();
  const { mutate: logout, isPending } = useLogout();

  return (
    <>
      <Sidebar />
      <header className="ml-[72px] flex h-[72px] items-center justify-between border-b border-border bg-white px-5 md:ml-[80px] md:h-[80px] md:px-8 lg:px-10">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Icon name="logo" size={32} />
            <span className="hidden text-base font-bold text-text md:inline">
              Medicine Store
            </span>
          </Link>
          <span className="hidden text-text-light md:inline">/</span>
          <Link
            href="/dashboard"
            className="hidden text-sm text-text-secondary transition-colors hover:text-primary md:inline"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-text-secondary md:inline">
            {user?.email || 'vendor@gmail.com'}
          </span>
          <button
            onClick={() => logout()}
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-primary transition-colors hover:bg-primary-light disabled:opacity-50"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>
    </>
  );
}
