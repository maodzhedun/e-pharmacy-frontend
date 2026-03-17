import type { Customer } from '@/types';

export default function CustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  if (!customers.length)
    return (
      <p className="py-10 text-center text-text-light">No customers found</p>
    );

  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border-light text-left text-xs font-medium uppercase tracking-wider text-text-light">
            <th className="px-4 py-3">User Info</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Register date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr
              key={c._id}
              className="border-b border-border-light transition-colors last:border-0 hover:bg-border-light/50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      c.image || c.photo || 'https://i.imgur.com/1As0akH.png'
                    }
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
              </td>
              <td className="max-w-[180px] truncate px-4 py-3 text-sm text-text-secondary">
                {c.email}
              </td>
              <td className="max-w-[180px] truncate px-4 py-3 text-sm text-text-secondary">
                {c.address}
              </td>
              <td className="px-4 py-3 text-sm">{c.phone}</td>
              <td className="px-4 py-3 text-sm text-text-secondary">
                {c.register_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
