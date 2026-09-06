import React from 'react';
import { Cpu } from 'lucide-react';

export const SystemSettings = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Cpu className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">ESP32 & Gateway Config</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="font-semibold text-slate-200">MQTT Broker Address</span>
          <span className="text-slate-400 font-mono">broker.hivemq.com:1883</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="font-semibold text-slate-200">Sampling Rate</span>
          <span className="text-slate-400">Every 2 Seconds</span>
        </div>
      </div>
    </div>
  );
};
