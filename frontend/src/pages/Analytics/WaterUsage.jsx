import React from 'react';
import { Droplets } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const WaterUsage = () => {
  const data = [
    { day: 'Mon', liters: 450 },
    { day: 'Tue', liters: 520 },
    { day: 'Wed', liters: 380 },
    { day: 'Thu', liters: 600 },
    { day: 'Fri', liters: 490 },
    { day: 'Sat', liters: 410 },
    { day: 'Sun', liters: 530 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <span>Weekly Water Consumption (Liters)</span>
        </h3>
        <span className="text-xs text-cyan-400 font-semibold">Total: 3,380 L</span>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="liters" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
