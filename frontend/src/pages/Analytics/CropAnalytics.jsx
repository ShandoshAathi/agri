import React from 'react';
import { Sprout, TrendingUp } from 'lucide-react';

export const CropAnalytics = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Yield Growth Performance</span>
        </h3>
        <span className="text-xs font-bold text-emerald-400">+18.5% Efficiency</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block">Tomato ( Rome )</span>
          <span className="font-bold text-slate-200 text-sm">28.5 Tons / Acre</span>
        </div>
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-slate-400 block">Potato ( Kufri )</span>
          <span className="font-bold text-slate-200 text-sm">24.0 Tons / Acre</span>
        </div>
      </div>
    </div>
  );
};
