import React from 'react';

export const Diagnosis = ({ result }) => {
  if (!result) return null;

  const isHealthy = result.disease?.includes('Healthy');

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4 eco-card font-sans">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider block">Computer Vision Diagnosis</span>
          <h3 className="text-xl font-black text-stone-900 mt-0.5 font-['Manrope',_sans-serif]">{result.disease}</h3>
        </div>
        <span className={`px-3 py-1 text-xs font-black rounded-full border shadow-2xs ${
          isHealthy 
            ? 'bg-lime-400 text-emerald-950 border-lime-500' 
            : 'bg-rose-100 text-rose-900 border-rose-300'
        }`}>
          {result.severity}
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl space-y-1">
          <span className="text-stone-700 font-bold block uppercase tracking-wider">Recommended Immediate Action</span>
          <p className="text-stone-900 font-medium">{result.treatment}</p>
        </div>

        <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl space-y-1">
          <span className="text-stone-700 font-bold block uppercase tracking-wider">Preventative Guidance</span>
          <p className="text-stone-900 font-medium">{result.prevention}</p>
        </div>
      </div>
    </div>
  );
};
