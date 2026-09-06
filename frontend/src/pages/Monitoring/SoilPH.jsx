import React from 'react';
import { Sprout } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const SoilPH = () => {
  const { currentReading } = useTelemetry();
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          <Sprout className="w-4 h-4 text-cyan-400" />
          <span>{t('Soil pH Balance')}</span>
        </span>
        <span className="text-cyan-400">{t('Slightly Acidic')}</span>
      </div>
      <div className="text-3xl font-extrabold text-slate-100">{currentReading.soil_ph}</div>
      <div className="text-xs text-slate-400 font-medium">{t('Ideal Range: 6.0 - 7.0')}</div>
    </div>
  );
};
