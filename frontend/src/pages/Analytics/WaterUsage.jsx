import React from 'react';
import { Droplets } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

export const WaterUsage = () => {
  const { t } = useLanguage();
  const data = [
    { day: t('Mon'), liters: 450 },
    { day: t('Tue'), liters: 520 },
    { day: t('Wed'), liters: 380 },
    { day: t('Thu'), liters: 600 },
    { day: t('Fri'), liters: 490 },
    { day: t('Sat'), liters: 410 },
    { day: t('Sun'), liters: 530 },
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4 eco-card font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center space-x-2 font-['Manrope',_sans-serif]">
          <Droplets className="w-4 h-4 text-emerald-800" />
          <span>{t('Weekly Water Consumption (Liters)')}</span>
        </h3>
        <span className="text-xs text-emerald-900 font-extrabold bg-lime-400/60 px-2.5 py-0.5 rounded-full border border-lime-500">{t('Total: 3,380 L')}</span>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" stroke="#78716c" fontSize={11} />
            <YAxis stroke="#78716c" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E7E5E4', borderRadius: '12px', color: '#1C1917', fontWeight: 'bold' }} />
            <Area type="monotone" dataKey="liters" stroke="#15803D" fill="#84CC16" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
