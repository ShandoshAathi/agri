import React from 'react';
import { Sun } from 'lucide-react';

export const WeatherCard = ({ temp = "26.4°C", humidity = "64%", condition = "Partly Sunny" }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
        <Sun className="w-4 h-4 text-amber-400" />
        <span>Microclimate Condition</span>
      </div>
      <div className="text-2xl font-bold text-slate-100">{temp}</div>
      <div className="text-xs text-slate-400">{condition} • Humidity {humidity}</div>
    </div>
  );
};
