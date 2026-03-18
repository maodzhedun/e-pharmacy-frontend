import clsx from 'clsx';

export default function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  return (
    <span
      className={clsx(
        'inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium',
        {
          'bg-[#59B17A1A] text-[#59B17A]': s === 'completed' || s === 'active',
          'bg-[#8B5CF61A] text-[#8B5CF6]': s === 'confirmed',
          'bg-[#F59E0B1A] text-[#F59E0B]':
            s === 'pending' || s === 'processing',
          'bg-[#E850501A] text-[#E85050]':
            s === 'cancelled' || s === 'deactive',
          'bg-[#3B82F61A] text-[#3B82F6]': s === 'shipped' || s === 'delivered',
        }
      )}
    >
      {status}
    </span>
  );
}
