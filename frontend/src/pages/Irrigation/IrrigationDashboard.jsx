import React from 'react';
import { ManualControl } from './ManualControl';
import { AutomationRules } from './AutomationRules';
import { IrrigationHistory } from './IrrigationHistory';
import { Droplets } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const IrrigationDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center space-x-3 bg-white border border-stone-200 p-5 rounded-2xl shadow-xs">
        <div className="p-2.5 bg-lime-400 text-emerald-950 border border-lime-500 rounded-xl shadow-2xs">
          <Droplets className="w-6 h-6 text-emerald-950" />
        </div>
        <div>
          <h2 className="text-xl font-black text-stone-900 font-['Manrope',_sans-serif]">{t('Smart Irrigation')}</h2>
          <p className="text-xs text-stone-500 font-medium">{t('Automated drip pump controls and schedules')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ManualControl />
        <AutomationRules />
      </div>

      <IrrigationHistory />
    </div>
  );
};
