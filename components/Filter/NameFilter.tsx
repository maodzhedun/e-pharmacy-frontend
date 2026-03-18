'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
  placeholder?: string;
  onFilter: (value: string) => void;
}

export default function NameFilter({ placeholder = 'User Name', onFilter }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-[40px] w-full max-w-[150px] rounded-full border border-border bg-white px-4 text-xs text-text outline-none transition-colors placeholder:text-text-light focus:border-primary sm:h-[44px] sm:max-w-[220px] sm:px-5 sm:text-sm md:max-w-[260px]"
      />
      <button
        type="submit"
        className="flex h-[40px] shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-medium text-white transition-colors hover:bg-primary-dark sm:h-[44px] sm:gap-2 sm:px-6 sm:text-sm"
      >
        <SlidersHorizontal size={14} />
        Filter
      </button>
    </form>
  );
}
