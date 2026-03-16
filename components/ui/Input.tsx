import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-light',
          error
            ? 'border-danger focus:border-danger'
            : 'border-border focus:border-primary',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';
export default Input;
