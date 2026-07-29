import React from 'react';
import { Sprout, Cpu, Droplets, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';

export const Overview = () => {
  const { currentReading } = useTelemetry();

  const metrics = [
    { title: 'Soil Moisture', value: `${currentReading.soil_moisture}%`, icon: Droplets, color: 'text-emerald-400', bg: 'bg-emerald-950/50' },
    { title: 'Temperature', value: `${currentReading.temperature}°C`, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-950/50' },
    { title: 'Soil pH', value: `${currentReading.soil_ph}`, icon: Sprout, color: 'text-teal-400', bg: 'bg-teal-950/50' },
    { title: 'Water Tank Level', value: `${currentReading.water_tank_level}%`, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-950/50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center space-x-4">
            <div className={`p-3 rounded-xl border border-slate-800 ${m.bg}`}>
              <Icon className={`w-6 h-6 ${m.color}`} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">{m.title}</div>
              <div className="text-2xl font-bold text-slate-100 mt-0.5">{m.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
