import React from 'react';
import { Droplets } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const SoilMoisture = () => {
  const { currentReading } = useTelemetry();
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3 eco-card">
      <div className="flex items-center justify-between text-xs text-stone-600 font-bold">
        <span className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-emerald-800" />
          <span>{t('Volumetric Soil Moisture')}</span>
        </span>
        <span className="px-2 py-0.5 bg-lime-400 text-emerald-950 font-black text-[10px] rounded-full">{t('Moist')}</span>
      </div>
      <div className="text-3xl font-black text-stone-900 font-['Manrope',_sans-serif]">{currentReading.soil_moisture}%</div>
      <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden border border-stone-300">
        <div className="bg-[#14532D] h-full rounded-full transition-all" style={{ width: `${currentReading.soil_moisture}%` }}></div>
      </div>
    </div>
  );
};
