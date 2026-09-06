import React from 'react';
import { Settings } from 'lucide-react';

export const FarmSettings = ({ _farm }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <Settings className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-slate-100">Plot Hardware & Safety Settings</h3>
      </div>

      <div className="space-y-4 text-xs text-slate-300">
        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <div>
            <span className="font-semibold block text-slate-200">ESP32 Node Auto-Ping</span>
            <span className="text-slate-400">Send heartbeat ping every 10 seconds</span>
          </div>
          <input type="checkbox" defaultChecked className="toggle-checkbox accent-emerald-500 w-4 h-4" />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <div>
            <span className="font-semibold block text-slate-200">Rain Sensor Pump Shutdown</span>
            <span className="text-slate-400">Automatically stop drip irrigation when rain is detected</span>
          </div>
          <input type="checkbox" defaultChecked className="toggle-checkbox accent-emerald-500 w-4 h-4" />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <div>
            <span className="font-semibold block text-slate-200">Low Water Tank Alarm</span>
            <span className="text-slate-400">Notify _farm manager if water tank level falls below 20%</span>
          </div>
          <input type="checkbox" defaultChecked className="toggle-checkbox accent-emerald-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
