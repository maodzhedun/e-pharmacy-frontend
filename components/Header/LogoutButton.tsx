'use client';

import { LogOut } from 'lucide-react';
import { useLogout } from '@/hooks/useAuth';

export default function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();
  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:h-[40px] sm:w-[40px]"
      title="Logout"
    >
      <LogOut size={16} className="sm:h-[18px] sm:w-[18px]" />
    </button>
  );
}
