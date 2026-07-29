import React from 'react';
import { ManualControl } from './ManualControl';
import { AutomationRules } from './AutomationRules';
import { IrrigationHistory } from './IrrigationHistory';
import { Droplets } from 'lucide-react';

export const IrrigationDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-emerald-400">
          <Droplets className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Smart Drip Irrigation Controller</h2>
          <p className="text-xs text-slate-400">Automated solenoid relay pump triggers & manual overrides</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ManualControl />
        <AutomationRules />
      </div>

      <IrrigationHistory />
    </div>
  );
};
