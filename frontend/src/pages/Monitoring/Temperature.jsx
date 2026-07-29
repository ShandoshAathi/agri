import React from 'react';
import { Thermometer, ArrowUp, ArrowDown } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';

export const Temperature = () => {
  const { currentReading } = useTelemetry();
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-amber-400" />
          <span>Ambient Temperature</span>
        </span>
        <span className="text-amber-400">Normal</span>
      </div>
      <div className="text-3xl font-extrabold text-slate-100">{currentReading.temperature}°C</div>
      <div className="text-xs text-slate-400 flex items-center space-x-2">
        <span className="text-emerald-400 flex items-center"><ArrowUp className="w-3 h-3" /> 0.4°C</span>
        <span>vs last hour average</span>
      </div>
    </div>
  );
};
