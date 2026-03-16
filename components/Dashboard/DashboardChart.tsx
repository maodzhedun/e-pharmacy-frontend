'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { IncomeExpense } from '@/types';

export default function DashboardChart({ data }: { data: IncomeExpense[] }) {
  const chartData = data
    .filter(item => item.type !== 'Error')
    .map(item => ({
      name: item.name.length > 12 ? item.name.slice(0, 12) + '…' : item.name,
      amount: parseFloat(item.amount.replace(/[^0-9.\-]/g, '')),
    }));

  return (
    <div className="mb-6 rounded-2xl border border-border-light bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-text">
        Income/Expenses Overview
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: 13,
            }}
          />
          <Bar
            dataKey="amount"
            fill="#59B17A"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
