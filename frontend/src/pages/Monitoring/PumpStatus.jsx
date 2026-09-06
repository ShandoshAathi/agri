import React from 'react';
import { Zap, Power } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const PumpStatus = () => {
  const { currentReading, togglePump } = useTelemetry();
  const { t } = useLanguage();
  const isON = currentReading.pump_status === 'ON';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>{t('Solenoid Drip Pump Status')}</span>
        </span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          isON ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
        }`}>
          {t(currentReading.pump_status)}
        </span>
      </div>

      <button
        onClick={togglePump}
        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
          isON 
            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50' 
            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
        }`}
      >
        <Power className="w-4 h-4" />
        <span>{isON ? t('Stop Solenoid Pump') : t('Start Solenoid Pump')}</span>
      </button>
    </div>
  );
};
