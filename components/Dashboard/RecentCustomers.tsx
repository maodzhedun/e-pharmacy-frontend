import type { Customer } from '@/types';

export default function RecentCustomers({ customers }: { customers: Customer[] }) {
  return (
    <div className="rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary-light px-4 py-2.5 sm:px-5 sm:py-3">
        <h3 className="text-sm font-semibold text-text sm:text-base">Recent Customers</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-border-light text-left text-xs text-text-light">
              <th className="px-4 py-2 font-normal sm:px-5">Name</th>
              <th className="px-4 py-2 font-normal sm:px-5">Email</th>
              <th className="px-4 py-2 font-normal sm:px-5">Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="border-b border-border-light last:border-0">
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src={c.image || c.photo || 'https://i.imgur.com/1As0akH.png'} alt="" className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9" loading="lazy" />
                    <span className="text-xs font-medium text-text sm:text-sm">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary sm:px-5 sm:text-sm">{c.email}</td>
                <td className="px-4 py-3 text-xs font-medium text-text sm:px-5 sm:text-sm">{c.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
