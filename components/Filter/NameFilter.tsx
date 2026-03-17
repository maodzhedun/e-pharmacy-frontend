'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Props {
  placeholder?: string;
  onFilter: (value: string) => void;
}

export default function NameFilter({
  placeholder = 'User Name',
  onFilter,
}: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 flex gap-3">
      <div className="relative max-w-[280px] flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
        />
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm text-text outline-none transition-colors placeholder:text-text-light focus:border-primary"
        />
      </div>
      <Button type="submit" size="sm">
        <Search size={16} className="mr-1.5" />
        Filter
      </Button>
    </form>
  );
}
