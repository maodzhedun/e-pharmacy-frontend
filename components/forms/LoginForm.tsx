'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema } from '@/utils/validationSchemas';
import { AuthCredentials } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-md md:p-10">
      <h2 className="mb-8 text-2xl font-bold text-text">
        Log in to your account
      </h2>
      <form onSubmit={handleSubmit(data => login(data))} className="space-y-4">
        <Input
          {...register('email')}
          type="email"
          label="Email address"
          placeholder="Enter your email"
          error={errors.email?.message}
          autoComplete="email"
        />
        <Input
          {...register('password')}
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          autoComplete="current-password"
        />
        <div className="pt-2">
          <Button type="submit" isLoading={isPending} className="w-full">
            Log in Now
          </Button>
        </div>
      </form>
    </div>
  );
}
