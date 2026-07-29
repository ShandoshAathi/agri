import React from 'react';
import { Sprout } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';

export const SoilPH = () => {
  const { currentReading } = useTelemetry();
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          <Sprout className="w-4 h-4 text-cyan-400" />
          <span>Soil pH Balance</span>
        </span>
        <span className="text-cyan-400">Slightly Acidic</span>
      </div>
      <div className="text-3xl font-extrabold text-slate-100">{currentReading.soil_ph}</div>
      <div className="text-xs text-slate-400 font-medium">Ideal Range: 6.0 - 7.0</div>
    </div>
  );
};
