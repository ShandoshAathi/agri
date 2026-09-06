import React from 'react';
import { History } from 'lucide-react';

export const IrrigationHistory = () => {
  const cycles = [
    { time: 'Today, 06:00 AM', duration: '25 Mins', volume: '450 Liters', trigger: 'Scheduled Moisture Rule' },
    { time: 'Yesterday, 06:00 AM', duration: '30 Mins', volume: '520 Liters', trigger: 'Soil Moisture < 35%' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <History className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">Irrigation Run Logs</h3>
      </div>

      <div className="space-y-3">
        {cycles.map((c, idx) => (
          <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-slate-200">{c.time}</div>
              <div className="text-slate-400">{c.trigger}</div>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-400 block">{c.volume}</span>
              <span className="text-slate-500">{c.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
