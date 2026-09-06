import React from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export const FarmHealth = () => {
  const healthStats = [
    { farm: 'Green Valley Estate', crop: 'Tomato (Hybrid Rome)', score: 94, status: 'Optimal' },
    { farm: 'Sunrise Farm', crop: 'Maize / Sweet Corn', score: 88, status: 'Attention Needed' },
    { farm: 'Heritage Organic Farm', crop: 'Paddy / Rice', score: 96, status: 'Optimal' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 font-['Manrope',_sans-serif]">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Farm Health Scoreboard</span>
        </h3>
        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          Average: 92.6%
        </span>
      </div>

      <div className="space-y-2.5">
        {healthStats.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between hover:bg-slate-100/80 transition-all">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900">{item.farm}</div>
              <div className="text-[11px] text-slate-500 font-medium">{item.crop}</div>
            </div>
            <div className="flex items-center space-x-2">
              {item.score >= 90 ? (
                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.score}% Optimal</span>
                </span>
              ) : (
                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{item.score}% Warning</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
