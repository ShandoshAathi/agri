import React from 'react';
import { AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

export const Diagnosis = ({ result }) => {
  if (!result) return null;

  const isHealthy = result.disease?.includes('Healthy');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Computer Vision Diagnosis</span>
          <h3 className="text-xl font-bold text-slate-100 mt-0.5">{result.disease}</h3>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
          isHealthy 
            ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
            : 'bg-rose-950/80 text-rose-400 border-rose-800'
        }`}>
          {result.severity}
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
          <span className="text-slate-400 font-bold block uppercase">Recommended Immediate Action</span>
          <p className="text-slate-200">{result.treatment}</p>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
          <span className="text-slate-400 font-bold block uppercase">Preventative Guidance</span>
          <p className="text-slate-200">{result.prevention}</p>
        </div>
      </div>
    </div>
  );
};
