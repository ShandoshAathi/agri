import React from 'react';
import { Overview } from './Overview';
import { WeatherWidget } from './WeatherWidget';
import { FarmHealth } from './FarmHealth';
import { Sprout, Activity, Cpu, ArrowRight } from 'lucide-react';

export const Dashboard = ({ setCurrentPage }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center space-x-3">
            <span>AgriSense Executive Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Real-Time ESP32 IoT Monitoring & AI Precision Insights</p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setCurrentPage && setCurrentPage('monitoring')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all"
          >
            <Activity className="w-4 h-4" />
            <span>Live Telemetry</span>
          </button>
        </div>
      </div>

      <Overview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <FarmHealth />
      </div>
    </div>
  );
};
