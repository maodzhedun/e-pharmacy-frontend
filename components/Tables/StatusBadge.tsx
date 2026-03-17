import clsx from 'clsx';

export default function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  return (
    <span
      className={clsx(
        'inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium',
        {
          'bg-primary-light text-primary-dark': [
            'completed',
            'active',
            'delivered',
          ].includes(s),
          'bg-info-light text-info': ['confirmed', 'shipped'].includes(s),
          'bg-warning-light text-warning': ['pending', 'processing'].includes(
            s
          ),
          'bg-danger-light text-danger': ['cancelled', 'deactive'].includes(s),
        }
      )}
    >
      {status}
    </span>
  );
}
