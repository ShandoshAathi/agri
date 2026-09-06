import React from 'react';
import { Thermometer, ArrowUp } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const Temperature = () => {
  const { currentReading } = useTelemetry();
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3 eco-card">
      <div className="flex items-center justify-between text-xs text-stone-600 font-bold">
        <span className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-amber-600" />
          <span>{t('Ambient Temperature')}</span>
        </span>
        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] rounded-full">{t('Normal')}</span>
      </div>
      <div className="text-3xl font-black text-stone-900 font-['Manrope',_sans-serif]">{currentReading.temperature}°C</div>
      <div className="text-xs text-stone-500 font-medium flex items-center space-x-2">
        <span className="text-emerald-800 font-bold flex items-center"><ArrowUp className="w-3 h-3" /> 0.4°C</span>
        <span>{t('vs last hour average')}</span>
      </div>
    </div>
  );
};
