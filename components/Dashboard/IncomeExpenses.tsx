import clsx from 'clsx';
import type { IncomeExpense } from '@/types';

export default function IncomeExpenses({ data }: { data: IncomeExpense[] }) {
  return (
    <div className="rounded-2xl border border-border-light bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-text">Income/Expenses</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-border-light text-left text-xs font-medium uppercase tracking-wider text-text-light">
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b border-border-light last:border-0"
              >
                <td className="px-3 py-3">
                  <span
                    className={clsx(
                      'inline-block rounded-full px-3 py-1 text-xs font-medium',
                      {
                        'bg-primary-light text-primary-dark':
                          item.type === 'Income',
                        'bg-danger-light text-danger': item.type === 'Expense',
                        'bg-warning-light text-warning': item.type === 'Error',
                      }
                    )}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="max-w-[200px] truncate px-3 py-3 text-sm text-text">
                  {item.name}
                </td>
                <td
                  className={clsx(
                    'px-3 py-3 text-sm font-semibold',
                    item.amount.startsWith('+') ? 'text-primary' : 'text-danger'
                  )}
                >
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
