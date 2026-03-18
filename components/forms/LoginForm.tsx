'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema } from '@/utils/validationSchemas';
import { AuthCredentials } from '@/types';

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<AuthCredentials>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-3 sm:space-y-4">
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email address"
          className="h-[40px] w-full rounded-full border border-border bg-white px-4 text-xs text-text outline-none transition-colors placeholder:text-text-light focus:border-primary sm:h-[44px] sm:px-5 sm:text-sm md:h-[46px]"
        />
        {errors.email && <p className="mt-1 pl-4 text-xs text-danger">{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="h-[40px] w-full rounded-full border border-border bg-white px-4 text-xs text-text outline-none transition-colors placeholder:text-text-light focus:border-primary sm:h-[44px] sm:px-5 sm:text-sm md:h-[46px]"
        />
        {errors.password && <p className="mt-1 pl-4 text-xs text-danger">{errors.password.message}</p>}
      </div>
      <div className="pt-1 sm:pt-2 md:pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="h-[40px] w-full rounded-full bg-primary text-xs font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:h-[44px] sm:text-sm md:h-[46px] md:text-base"
        >
          {isPending ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </form>
  );
}
