import React from 'react';
import { History } from 'lucide-react';

export const HistoryLogs = () => {
  const scans = [
    { date: '2026-07-28', disease: 'Early Blight (Alternaria solani)', severity: 'Moderate (55%)' },
    { date: '2026-07-22', disease: 'Healthy Crop (No Disease)', severity: 'Low Risk (2%)' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
        <History className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">Scan History</h3>
      </div>

      <div className="space-y-3">
        {scans.map((s, idx) => (
          <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-slate-200">{s.disease}</div>
              <div className="text-slate-400">Scan Date: {s.date}</div>
            </div>
            <span className="font-bold text-amber-400">{s.severity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
