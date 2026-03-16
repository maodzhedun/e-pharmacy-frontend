import type { Customer } from '@/types';

export default function RecentCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <div className="rounded-2xl border border-border-light bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-text">Recent Customers</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-border-light text-left text-xs font-medium uppercase tracking-wider text-text-light">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr
                key={c._id}
                className="border-b border-border-light last:border-0"
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        c.image || c.photo || 'https://i.imgur.com/1As0akH.png'
                      }
                      alt={c.name}
                      className="h-9 w-9 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="text-sm font-medium text-text">
                      {c.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 text-sm text-text-secondary">
                  {c.email}
                </td>
                <td className="px-3 py-3 text-sm font-semibold text-text">
                  {c.spent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
