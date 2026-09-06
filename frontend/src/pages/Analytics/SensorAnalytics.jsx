import React from 'react';
import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

export const SensorAnalytics = () => {
  const { t } = useLanguage();
  const data = [
    { time: '08:00', moisture: 38, temp: 22 },
    { time: '10:00', moisture: 40, temp: 24 },
    { time: '12:00', moisture: 42, temp: 26 },
    { time: '14:00', moisture: 41, temp: 27 },
    { time: '16:00', moisture: 44, temp: 25 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>{t('Telemetry Moisture vs Temp Trend')}</span>
        </h3>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="moisture" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
