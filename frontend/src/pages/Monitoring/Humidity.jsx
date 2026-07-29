import React from 'react';
import { Wind } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';

export const Humidity = () => {
  const { currentReading } = useTelemetry();
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-teal-400" />
          <span>Relative Humidity</span>
        </span>
        <span className="text-teal-400">Optimal</span>
      </div>
      <div className="text-3xl font-extrabold text-slate-100">{currentReading.humidity}%</div>
      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
        <div className="bg-teal-500 h-full rounded-full transition-all" style={{ width: `${currentReading.humidity}%` }}></div>
      </div>
    </div>
  );
};
