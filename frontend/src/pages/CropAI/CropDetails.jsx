import React from 'react';
import { Sprout } from 'lucide-react';

export const CropDetails = ({ cropName = "Tomato (Hybrid Rome)" }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <Sprout className="w-6 h-6 text-emerald-400" />
        <div>
          <h3 className="text-lg font-bold text-slate-100">{cropName}</h3>
          <span className="text-xs text-slate-400">Solanum lycopersicum</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block">Growth Cycle</span>
          <span className="font-bold text-slate-200">90 - 110 Days</span>
        </div>
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block">Soil Requirement</span>
          <span className="font-bold text-slate-200">pH 6.0 - 6.8</span>
        </div>
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-slate-500 block">Optimal Temp</span>
          <span className="font-bold text-slate-200">20°C - 30°C</span>
        </div>
      </div>
    </div>
  );
};
