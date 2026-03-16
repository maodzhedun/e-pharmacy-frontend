import { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'sm' | 'md';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading,
      disabled,
      className,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={clsx(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        {
          'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
          'border border-border bg-white text-text-secondary hover:bg-border-light':
            variant === 'outline',
          'bg-danger text-white hover:bg-danger/80': variant === 'danger',
        },
        {
          'px-4 py-2 text-xs': size === 'sm',
          'px-6 py-3 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
