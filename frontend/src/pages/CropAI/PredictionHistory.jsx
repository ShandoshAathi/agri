import React from 'react';
import { History } from 'lucide-react';

export const PredictionHistory = () => {
  const history = [
    { date: '2026-07-28', crop: 'Tomato (Hybrid Rome)', confidence: '96.4%', ph: 6.5, moisture: '45%' },
    { date: '2026-07-20', crop: 'Potato (Kufri Jyoti)', confidence: '94.8%', ph: 5.8, moisture: '52%' },
    { date: '2026-07-12', crop: 'Sweet Corn', confidence: '91.2%', ph: 6.4, moisture: '40%' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
        <History className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">Historical AI Recommendations</h3>
      </div>

      <div className="space-y-3">
        {history.map((h, idx) => (
          <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-slate-200">{h.crop}</div>
              <div className="text-slate-400">Date: {h.date} • pH: {h.ph} • Moisture: {h.moisture}</div>
            </div>
            <span className="font-bold text-emerald-400">{h.confidence}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
