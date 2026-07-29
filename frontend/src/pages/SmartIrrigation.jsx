import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { useFarm } from '../context/FarmContext';
import { 
  Droplets, 
  Zap, 
  Sliders
} from 'lucide-react';

export const SmartIrrigation = () => {
  const { telemetry, togglePump, setIrrigationMode } = useTelemetry();
  const { settings, setSettings, selectedFarm } = useFarm();

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <Droplets className="w-6 h-6 text-emerald-400" />
            <span>Smart Drip Irrigation Automation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated solenoid relay decision rules based on real-time soil moisture and rain sensor overrides.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setIrrigationMode('AUTOMATIC')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              telemetry.mode === 'AUTOMATIC'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AUTOMATIC MODE
          </button>
          <button
            onClick={() => setIrrigationMode('MANUAL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              telemetry.mode === 'MANUAL'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MANUAL MODE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Main Drip Pump Relay</span>
              <span className="text-xs font-semibold text-slate-400">Node #ESP32-RELAY</span>
            </h3>

            <div className="py-6 text-center">
              <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center border-4 transition-all ${
                telemetry.pumpStatus === 'ON'
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-2xl shadow-emerald-500/40 animate-pulse'
                  : 'border-slate-800 bg-slate-900'
              }`}>
                <Zap className={`w-10 h-10 ${telemetry.pumpStatus === 'ON' ? 'text-emerald-400' : 'text-slate-600'}`} />
              </div>

              <h4 className="text-2xl font-black text-slate-100 mt-4">
                Pump is <span className={telemetry.pumpStatus === 'ON' ? 'text-emerald-400' : 'text-slate-400'}>{telemetry.pumpStatus}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">Active Sector: {selectedFarm.name}</p>
            </div>
          </div>

          <button
            onClick={togglePump}
            className={`w-full py-3.5 rounded-2xl text-xs font-extrabold transition-all shadow-xl ${
              telemetry.pumpStatus === 'ON'
                ? 'bg-rose-500 hover:bg-rose-400 text-white'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
            }`}
          >
            {telemetry.pumpStatus === 'ON' ? 'EMERGENCY SHUTOFF PUMP' : 'START WATER PUMP NOW'}
          </button>
        </div>

        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-100 pb-3 border-b border-slate-800 flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <span>Automation Rule Thresholds</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-200">Start Pump Threshold (Soil Moisture &lt; {settings.minSoilMoistureThreshold}%)</p>
                <p className="text-slate-400 text-[11px]">When soil drops below this limit, auto-irrigation engages.</p>
              </div>
              <input
                type="number"
                value={settings.minSoilMoistureThreshold}
                onChange={(e) => setSettings({ ...settings, minSoilMoistureThreshold: parseInt(e.target.value) })}
                className="w-20 glass-input rounded-xl px-3 py-1.5 text-xs text-center font-bold text-emerald-400"
              />
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-200">Stop Pump Threshold (Soil Moisture &ge; {settings.maxSoilMoistureThreshold}%)</p>
                <p className="text-slate-400 text-[11px]">Prevents waterlogging and root rot by stopping pump automatically.</p>
              </div>
              <input
                type="number"
                value={settings.maxSoilMoistureThreshold}
                onChange={(e) => setSettings({ ...settings, maxSoilMoistureThreshold: parseInt(e.target.value) })}
                className="w-20 glass-input rounded-xl px-3 py-1.5 text-xs text-center font-bold text-teal-300"
              />
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-200">Rain Sensor Auto Override</p>
                <p className="text-slate-400 text-[11px]">Automatically disables pump if optical rain sensor detects rainfall.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.rainSensorOverride}
                  onChange={(e) => setSettings({ ...settings, rainSensorOverride: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
