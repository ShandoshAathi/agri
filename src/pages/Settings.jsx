import React from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Globe, 
  Moon, 
  BellRing,
  Save
} from 'lucide-react';

export const Settings = () => {
  const { settings, setSettings } = useFarm();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
          <SettingsIcon className="w-6 h-6 text-emerald-400" />
          <span>System Settings & Preferences</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Configure global automation rules, sensor alert boundaries, and language preferences.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 text-xs">
        {/* Hardware Alert Thresholds */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-100 pb-2 border-b border-slate-800 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Hardware Alert Boundaries</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <label className="block text-slate-300 font-semibold mb-1">Max Temperature Alert (°C)</label>
              <input
                type="number"
                value={settings.tempAlertUpper}
                onChange={(e) => setSettings({ ...settings, tempAlertUpper: parseFloat(e.target.value) })}
                className="w-full glass-input rounded-lg px-3 py-1.5 text-xs text-amber-400 font-bold"
              />
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <label className="block text-slate-300 font-semibold mb-1">Min Tank Water Reserve (%)</label>
              <input
                type="number"
                value={settings.tankMinLevel}
                onChange={(e) => setSettings({ ...settings, tankMinLevel: parseInt(e.target.value) })}
                className="w-full glass-input rounded-lg px-3 py-1.5 text-xs text-sky-400 font-bold"
              />
            </div>
          </div>
        </div>

        {/* UI & System Preferences */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-100 pb-2 border-b border-slate-800 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-teal-300" />
            <span>Language & Theme</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <label className="block text-slate-300 font-semibold mb-1">Display Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-xs"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Hindi">Hindi</option>
                <option value="French">French</option>
              </select>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <label className="block text-slate-300 font-semibold mb-1">Interface Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-xs"
              >
                <option value="Dark Glass">Dark Glass (Emerald Modern)</option>
                <option value="High Contrast">High Contrast Cyber Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
