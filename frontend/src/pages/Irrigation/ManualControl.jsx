import React from 'react';
import { Power, Zap } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';

export const ManualControl = () => {
  const { currentReading, togglePump } = useTelemetry();
  const isON = currentReading.pump_status === 'ON';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          <span>Manual Pump Relay Control</span>
        </h3>
        <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
          isON ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-800 text-slate-400'
        }`}>
          Pump {currentReading.pump_status}
        </span>
      </div>

      <p className="text-xs text-slate-400">Override automated rules to manually start or halt 12V solenoid drip irrigation pump.</p>

      <button
        onClick={togglePump}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
          isON 
            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50' 
            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
        }`}
      >
        <Power className="w-5 h-5" />
        <span>{isON ? 'Turn OFF Pump Relay' : 'Turn ON Pump Relay'}</span>
      </button>
    </div>
  );
};
