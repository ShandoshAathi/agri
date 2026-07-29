import React from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export const FarmHealth = () => {
  const healthStats = [
    { farm: 'Green Valley Estate', crop: 'Tomato (Hybrid Rome)', score: 94, status: 'Optimal' },
    { farm: 'Sunlight Acres', crop: 'Maize / Sweet Corn', score: 88, status: 'Attention Needed' },
    { farm: 'Riverbend Organic Farm', crop: 'Potato (Kufri Jyoti)', score: 96, status: 'Optimal' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Farm Health Scoreboard</span>
        </h3>
        <span className="text-xs text-emerald-400 font-semibold">Average: 92.6%</span>
      </div>

      <div className="space-y-3">
        {healthStats.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-slate-200">{item.farm}</div>
              <div className="text-xs text-slate-400">{item.crop}</div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                item.score >= 90 
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                  : 'bg-amber-950/80 text-amber-400 border-amber-800/60'
              }`}>
                {item.score}% Health
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
