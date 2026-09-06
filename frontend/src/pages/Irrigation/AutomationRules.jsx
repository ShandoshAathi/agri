import React, { useState } from 'react';
import { Sliders, Save, CloudRain } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AutomationRules = () => {
  const { t } = useLanguage();
  const [minMoisture, setMinMoisture] = useState(35);
  const [rainOverride, setRainOverride] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4 eco-card font-sans">
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
        <Sliders className="w-5 h-5 text-emerald-800" />
        <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif]">{t('Smart Drip Irrigation Threshold Rules')}</h3>
      </div>

      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-stone-700 mb-1">{t('Trigger Pump ON Below Moisture')} ({minMoisture}%)</label>
          <input type="range" min="15" max="60" value={minMoisture} onChange={(e) => setMinMoisture(e.target.value)} className="w-full accent-emerald-800" />
        </div>

        <div className="flex items-center justify-between p-3 bg-stone-100 border border-stone-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <CloudRain className="w-4 h-4 text-emerald-800" />
            <span className="font-bold text-stone-800">{t('Rain Sensor Auto-Override')}</span>
          </div>
          <input type="checkbox" checked={rainOverride} onChange={(e) => setRainOverride(e.target.checked)} className="accent-emerald-800 w-4 h-4 cursor-pointer" />
        </div>
      </div>

      <button type="submit" className="w-full py-3 bg-[#14532D] hover:bg-emerald-900 text-[#BEF264] font-black text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 border border-lime-400/40 cursor-pointer">
        <Save className="w-4 h-4 text-lime-400" />
        <span>{saved ? t('Rules Updated!') : t('Save Automation Rules')}</span>
      </button>
    </form>
  );
};
