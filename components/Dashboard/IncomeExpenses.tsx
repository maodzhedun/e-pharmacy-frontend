import clsx from 'clsx';
import type { IncomeExpense } from '@/types';

export default function IncomeExpenses({ data }: { data: IncomeExpense[] }) {
  return (
    <div className="rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary-light px-4 py-2.5 sm:px-5 sm:py-3">
        <h3 className="text-sm font-semibold text-text sm:text-base">Income/Expenses</h3>
      </div>
      <div className="p-4 sm:p-5">
        <p className="mb-3 text-xs text-text-light sm:mb-4">Today</p>
        <div className="space-y-2.5 sm:space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <span className={clsx('inline-block w-[60px] shrink-0 rounded-full px-2 py-1 text-center text-[10px] font-medium sm:w-[70px]', {
                'bg-primary-light text-primary-dark': item.type === 'Income',
                'bg-danger-light text-danger': item.type === 'Expense',
                'bg-border-light text-text-secondary': item.type === 'Error',
              })}>{item.type}</span>
              <span className="flex-1 truncate text-xs text-text sm:text-sm">{item.name}</span>
              <span className={clsx('shrink-0 text-xs font-medium sm:text-sm', {
                'text-primary': item.amount.startsWith('+'),
                'text-danger': item.amount.startsWith('-'),
                'text-text': !item.amount.startsWith('+') && !item.amount.startsWith('-'),
              })}>{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
