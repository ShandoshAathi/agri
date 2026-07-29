import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  BarChart3, 
  TrendingUp, 
  Droplets
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const waterUsageData = [
  { day: 'Mon', liters: 420 },
  { day: 'Tue', liters: 380 },
  { day: 'Wed', liters: 510 },
  { day: 'Thu', liters: 290 },
  { day: 'Fri', liters: 460 },
  { day: 'Sat', liters: 340 },
  { day: 'Sun', liters: 390 },
];

export const Analytics = () => {
  const { telemetryHistory } = useTelemetry();

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-teal-300" />
            <span>Farm Telemetry & Water Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Historical sensor trendlines, micro-climate curves, and precision water usage reports.</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>24-Hour Soil Moisture vs Air Temperature Profile</span>
          </span>
          <span className="text-xs text-slate-400">Live ESP32 Stream</span>
        </h3>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryHistory}>
              <defs>
                <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#10b981" fillOpacity={1} fill="url(#moistureGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#14b8a6" fillOpacity={1} fill="url(#tempGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2 pb-2 border-b border-slate-800">
          <Droplets className="w-5 h-5 text-sky-400" />
          <span>Weekly Drip Irrigation Water Consumption (Liters)</span>
        </h3>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="liters" name="Water Used (Liters)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
