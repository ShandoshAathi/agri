import React, { useState } from 'react';
import { Sliders, Save, CloudRain } from 'lucide-react';

export const AutomationRules = () => {
  const [minMoisture, setMinMoisture] = useState(35);
  const [rainOverride, setRainOverride] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Sliders className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">Smart Drip Irrigation Threshold Rules</h3>
      </div>

      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Trigger Pump ON Below Moisture ({minMoisture}%)</label>
          <input type="range" min="15" max="60" value={minMoisture} onChange={(e) => setMinMoisture(e.target.value)} className="w-full accent-emerald-500" />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <div className="flex items-center space-x-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">Rain Sensor Auto-Override</span>
          </div>
          <input type="checkbox" checked={rainOverride} onChange={(e) => setRainOverride(e.target.checked)} className="accent-emerald-500 w-4 h-4" />
        </div>
      </div>

      <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2">
        <Save className="w-4 h-4" />
        <span>{saved ? 'Rules Updated!' : 'Save Automation Rules'}</span>
      </button>
    </form>
  );
};
