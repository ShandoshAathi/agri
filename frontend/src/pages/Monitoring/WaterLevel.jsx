import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const WaterLevel = () => {
  const { currentReading } = useTelemetry();
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span>{t('Water Tank Level')}</span>
        </span>
        <span className="text-blue-400">{t('Adequate')}</span>
      </div>
      <div className="text-3xl font-extrabold text-slate-100">{currentReading.water_tank_level}%</div>
      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
        <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${currentReading.water_tank_level}%` }}></div>
      </div>
    </div>
  );
};
