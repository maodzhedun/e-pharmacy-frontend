'use client';

import clsx from 'clsx';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={clsx(
            'h-3 w-3 rounded-full transition-colors',
            page === p ? 'bg-primary' : 'bg-border hover:bg-text-light'
          )}
          aria-label={`Page ${p}`}
          aria-current={page === p ? 'page' : undefined}
        />
      ))}
    </div>
  );
}
