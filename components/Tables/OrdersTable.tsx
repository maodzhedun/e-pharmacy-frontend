import type { Order } from '@/types';
import StatusBadge from './StatusBadge';

export default function OrdersTable({ orders }: { orders: Order[] }) {
  if (!orders.length) return <p className="py-10 text-center text-text-light">No orders found</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary-light px-4 py-2.5 sm:px-5 sm:py-3">
        <h3 className="text-sm font-semibold text-text sm:text-base">All orders</h3>
      </div>
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border-light text-left text-xs text-text-light">
            <th className="px-4 py-2 font-normal sm:px-5">User Info</th>
            <th className="px-4 py-2 font-normal sm:px-5">Address</th>
            <th className="px-4 py-2 font-normal sm:px-5">Products</th>
            <th className="px-4 py-2 font-normal sm:px-5">Order date</th>
            <th className="px-4 py-2 font-normal sm:px-5">Price</th>
            <th className="px-4 py-2 font-normal sm:px-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b border-border-light last:border-0">
              <td className="px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <img src={o.photo || 'https://i.imgur.com/1As0akH.png'} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
                  <span className="text-sm font-medium text-text">{o.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{o.address}</td>
              <td className="px-4 py-3 text-sm text-text sm:px-5">{o.products}</td>
              <td className="px-4 py-3 text-sm text-text-secondary sm:px-5">{o.order_date}</td>
              <td className="px-4 py-3 text-sm font-medium text-text sm:px-5">{o.price}</td>
              <td className="px-4 py-3 sm:px-5"><StatusBadge status={o.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
