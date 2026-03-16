import { forwardRef, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          'w-full rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none transition-colors',
          error ? 'border-danger' : 'border-border focus:border-primary',
          className
        )}
        {...props}
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';
export default Select;
