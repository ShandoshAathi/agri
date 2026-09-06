import React from 'react';


export const CropCard = ({ name, yieldEstimate, confidence }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-100 text-sm">{name}</span>
        <span className="text-xs font-bold text-emerald-400">{confidence}% Match</span>
      </div>
      <div className="text-xs text-slate-400">Yield: {yieldEstimate}</div>
    </div>
  );
};
