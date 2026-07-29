import React from 'react';
import { WaterUsage } from './WaterUsage';
import { SensorAnalytics } from './SensorAnalytics';
import { CropAnalytics } from './CropAnalytics';
import { Reports } from './Reports';
import { BarChart3 } from 'lucide-react';

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-emerald-400">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Agricultural Data Analytics</h2>
          <p className="text-xs text-slate-400">Water usage optimization, yield metrics & downloadable reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WaterUsage />
        <SensorAnalytics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropAnalytics />
        <Reports />
      </div>
    </div>
  );
};
