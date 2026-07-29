import React from 'react';
import { ShieldCheck, Pill, CheckCircle } from 'lucide-react';

export const Treatment = ({ treatmentText }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
        <Pill className="w-4 h-4" />
        <span>Targeted Agronomic Treatment Plan</span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">
        {treatmentText || "Apply copper-based fungicide spray twice weekly and isolate affected leaf area."}
      </p>
    </div>
  );
};
