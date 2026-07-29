import React from 'react';
import { Sun, CloudRain, Wind, Compass, Droplets } from 'lucide-react';

export const WeatherWidget = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Local Microclimate Weather</span>
        </h3>
        <span className="text-xs text-slate-400 font-mono">Salinas Valley, CA</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sun className="w-12 h-12 text-amber-400 animate-pulse" />
          <div>
            <div className="text-3xl font-extrabold text-slate-100">26.4°C</div>
            <div className="text-xs text-slate-400 font-medium">Partly Sunny • No Rain</div>
          </div>
        </div>

        <div className="space-y-1 text-right text-xs text-slate-400">
          <div className="flex items-center justify-end space-x-1">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>Humidity: 64%</span>
          </div>
          <div className="flex items-center justify-end space-x-1">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <span>Wind: 12 km/h</span>
          </div>
          <div className="flex items-center justify-end space-x-1">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Barometer: 1014 hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
