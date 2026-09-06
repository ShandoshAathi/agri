import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { BarChart3, TrendingUp, Droplets, Download, Calendar, Activity, Thermometer, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
  const [timeRange, setTimeRange] = useState('24h'); // '24h', '7d', '30d'

  const downloadCSV = () => {
    const headers = ['Time', 'Soil Moisture (%)', 'Temperature (°C)', 'Humidity (%)'];
    const rows = telemetryHistory.map(row => [row.time, row.moisture, row.temp, row.humidity || 60]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Farm_Telemetry_Analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-teal-300" />
            <span>Farm Telemetry & Water Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Historical sensor trendlines, micro-climate curves, and precision water usage reports.</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {['24h', '7d', '30d'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all uppercase ${
                  timeRange === range ? 'bg-emerald-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={downloadCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Soil Moisture</span>
          <span className="text-xl font-black text-emerald-400">44.8%</span>
          <span className="text-[10px] text-emerald-500 font-semibold block mt-0.5">Optimal Root Zone</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Water Saved</span>
          <span className="text-xl font-black text-teal-300">1,420 L</span>
          <span className="text-[10px] text-teal-400 font-semibold block mt-0.5">Drip Automation</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Peak Micro Temp</span>
          <span className="text-xl font-black text-amber-400">31.2°C</span>
          <span className="text-[10px] text-amber-500 font-semibold block mt-0.5">Afternoon High</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Relay Efficiency</span>
          <span className="text-xl font-black text-cyan-300">98.4%</span>
          <span className="text-[10px] text-cyan-400 font-semibold block mt-0.5">Zero Water Waste</span>
        </div>
      </div>

      {/* Chart 1: Moisture & Temp Area Trendline */}
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

      {/* Chart 2: Weekly Water Usage Bar Chart */}
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
