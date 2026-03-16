'use client';

import { useEffect } from 'react';
import { authApi } from '@/services/clientApi';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore(s => s.setUser);
  const clearAuth = useAuthStore(s => s.clearAuth);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: sessionData } = await authApi.getSession();
        if (sessionData.authenticated) {
          const { data: userData } = await authApi.getCurrentUser();
          if (userData && userData.name) {
            setUser(userData);
          } else {
            clearAuth();
          }
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    };

    checkSession();
  }, [setUser, clearAuth]);

  return <>{children}</>;
}
