import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { authApi } from '@/services/clientApi';
import { useAuthStore } from '@/store/authStore';
import { AuthCredentials } from '@/types';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const { data } = await authApi.login(credentials);
      return data;
    },
    onSuccess: data => {
      setUser(data);
      toast.success('Welcome back!');
      router.push('/dashboard');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.error || 'Login failed');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore(s => s.clearAuth);

  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out');
      router.push('/login');
    },
  });
}

export function useAuth() {
  const { user, isAuthenticated } = useAuthStore();
  return { user, isAuthenticated };
}
