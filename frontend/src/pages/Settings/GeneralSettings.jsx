import React from 'react';
import { Globe, Sliders } from 'lucide-react';

export const GeneralSettings = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Globe className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">General Platform Preferences</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-400 font-semibold mb-1">Temperature Unit</label>
          <select className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200">
            <option value="c">Celsius (°C)</option>
            <option value="f">Fahrenheit (°F)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1">Timezone</label>
          <select className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200">
            <option value="pst">Pacific Standard Time (PST)</option>
            <option value="utc">Coordinated Universal Time (UTC)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
