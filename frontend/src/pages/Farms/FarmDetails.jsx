import React from 'react';
import { MapPin, Sprout, Cpu, User, Activity, Layers, ArrowLeft } from 'lucide-react';

export const FarmDetails = ({ farm, onBack }) => {
  if (!farm) return <div className="text-slate-400 text-sm">No farm selected.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        {onBack && (
          <button onClick={onBack} className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{farm.name}</h2>
          <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{farm.location}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 block font-semibold uppercase">Crop Type</span>
          <span className="text-xl font-bold text-slate-100">{farm.crop}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 block font-semibold uppercase">Area & Soil</span>
          <span className="text-xl font-bold text-slate-100">{farm.acres} Acres ({farm.soilType})</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs text-slate-400 block font-semibold uppercase">Assigned Farmer</span>
          <span className="text-xl font-bold text-slate-100">{farm.farmer}</span>
        </div>
      </div>
    </div>
  );
};
