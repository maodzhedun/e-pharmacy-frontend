import type { Customer } from '@/types';

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  if (!customers.length) return <p className="py-10 text-center text-text-light">No customers found</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary-light px-4 py-2.5 sm:px-5 sm:py-3">
        <h3 className="text-sm font-semibold text-text sm:text-base">Customers Data</h3>
      </div>
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border-light text-left text-xs text-text-light">
            <th className="px-4 py-2 font-normal sm:px-5">User Info</th>
            <th className="px-4 py-2 font-normal sm:px-5">Email</th>
            <th className="px-4 py-2 font-normal sm:px-5">Address</th>
            <th className="px-4 py-2 font-normal sm:px-5">Phone</th>
            <th className="px-4 py-2 font-normal sm:px-5">Register date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id} className="border-b border-border-light last:border-0">
              <td className="px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <img src={c.image || c.photo || 'https://i.imgur.com/1As0akH.png'} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
                  <span className="text-sm font-medium text-text">{c.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{c.email}</td>
              <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{c.address}</td>
              <td className="px-4 py-3 text-sm text-text sm:px-5">{c.phone}</td>
              <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{c.register_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
