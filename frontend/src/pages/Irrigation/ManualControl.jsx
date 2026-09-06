import React from 'react';
import { Power, Zap } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const ManualControl = () => {
  const { currentReading, togglePump } = useTelemetry();
  const { t } = useLanguage();
  const isON = currentReading.pump_status === 'ON';

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4 eco-card font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-stone-900 flex items-center space-x-2 font-['Manrope',_sans-serif]">
          <Zap className="w-5 h-5 text-emerald-800" />
          <span>{t('Manual Pump Relay Control')}</span>
        </h3>
        <span className={`px-3 py-1 text-xs font-black rounded-full border shadow-2xs ${
          isON ? 'bg-lime-400 text-emerald-950 border-lime-500' : 'bg-stone-200 text-stone-700 border-stone-300'
        }`}>
          {isON ? t('Pump ON') : t('Pump OFF')}
        </span>
      </div>

      <p className="text-xs text-stone-500 font-medium">{t('Override automated rules to manually start or halt 12V solenoid drip irrigation pump.')}</p>

      <button
        onClick={togglePump}
        className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
          isON 
            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md' 
            : 'bg-[#14532D] hover:bg-emerald-900 text-[#BEF264] shadow-md border border-lime-400/40'
        }`}
      >
        <Power className="w-4 h-4" />
        <span>{isON ? t('Turn OFF Pump Relay') : t('Turn ON Pump Relay')}</span>
      </button>
    </div>
  );
};
