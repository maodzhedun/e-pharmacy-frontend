import type { Order } from '@/types';
import StatusBadge from './StatusBadge';

export default function OrdersTable({ orders }: { orders: Order[] }) {
  if (!orders.length)
    return <p className="py-10 text-center text-text-light">No orders found</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border-light text-left text-xs font-medium uppercase tracking-wider text-text-light">
            <th className="px-4 py-3">User Info</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Products</th>
            <th className="px-4 py-3">Order date</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr
              key={o._id}
              className="border-b border-border-light transition-colors last:border-0 hover:bg-border-light/50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={o.photo || 'https://i.imgur.com/1As0akH.png'}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium">{o.name}</span>
                </div>
              </td>
              <td className="max-w-[180px] truncate px-4 py-3 text-sm text-text-secondary">
                {o.address}
              </td>
              <td className="px-4 py-3 text-sm">{o.products}</td>
              <td className="px-4 py-3 text-sm text-text-secondary">
                {o.order_date}
              </td>
              <td className="px-4 py-3 text-sm font-medium">${o.price}</td>
              <td className="px-4 py-3">
                <StatusBadge status={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
