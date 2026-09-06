import React from 'react';
import { MapPin } from 'lucide-react';

export const FarmCard = ({ name, location, crop, acres, healthScore }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-100 text-sm">{name}</h4>
        <span className="text-xs font-bold text-emerald-400">{healthScore}% Health</span>
      </div>
      <div className="text-xs text-slate-400 flex items-center space-x-1">
        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
        <span>{location}</span>
      </div>
      <div className="text-xs text-slate-300">Crop: {crop} ({acres} Acres)</div>
    </div>
  );
};
