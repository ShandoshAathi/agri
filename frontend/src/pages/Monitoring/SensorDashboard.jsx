import React from 'react';
import { Temperature } from './Temperature';
import { Humidity } from './Humidity';
import { SoilMoisture } from './SoilMoisture';
import { SoilPH } from './SoilPH';
import { WaterLevel } from './WaterLevel';
import { PumpStatus } from './PumpStatus';
import { Activity, Wifi } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SensorDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between bg-white border border-stone-200 p-5 rounded-2xl shadow-xs">
        <div>
          <h2 className="text-xl font-black text-stone-900 flex items-center space-x-2 font-['Manrope',_sans-serif]">
            <Activity className="w-5 h-5 text-emerald-800" />
            <span>{t('Sensor Monitoring')}</span>
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">{t('Real-time IoT telemetry readings and node health')}</p>
        </div>
        <div className="flex items-center space-x-2 bg-lime-400 text-emerald-950 border border-lime-500 px-3.5 py-1.5 rounded-full text-xs font-black shadow-2xs">
          <Wifi className="w-4 h-4 text-emerald-950 animate-pulse" />
          <span>{t('Active')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SoilMoisture />
        <Temperature />
        <Humidity />
        <SoilPH />
        <WaterLevel />
        <PumpStatus />
      </div>
    </div>
  );
};
