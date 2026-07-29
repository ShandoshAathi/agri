import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { useFarm } from '../context/FarmContext';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Waves, 
  Cpu, 
  Zap,
  Clock
} from 'lucide-react';

export const LiveMonitoring = () => {
  const { telemetry, togglePump } = useTelemetry();
  const { selectedFarm, devices } = useFarm();

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-2xl font-bold text-slate-100">Live IoT Monitoring Center</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry stream from ESP32 gateway microcontrollers on <strong className="text-emerald-400">{selectedFarm.name}</strong>.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Last Sync: {telemetry.lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-slate-200">Soil Moisture</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Sensor #1
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <span className="text-4xl font-extrabold text-emerald-400">{telemetry.soilMoisture}%</span>
              <p className="text-xs text-slate-400 mt-1">Status: {telemetry.soilMoisture < 35 ? 'Moisture Low (Watering needed)' : 'Optimal Hydration'}</p>
            </div>
            <div className="w-20 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="bg-emerald-400 h-full transition-all duration-500" 
                style={{ width: `${telemetry.soilMoisture}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-teal-300" />
              <span className="text-sm font-bold text-slate-200">Temperature (DHT22)</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Microclimate
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <span className="text-4xl font-extrabold text-teal-300">{telemetry.temperature}°C</span>
              <p className="text-xs text-slate-400 mt-1">Ambient Air Temp</p>
            </div>
            <span className="text-xs font-bold text-slate-300">Humidity: {telemetry.humidity}%</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-bold text-slate-200">Soil pH Level</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Probe Active
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <span className="text-4xl font-extrabold text-cyan-300">{telemetry.soilPh}</span>
              <p className="text-xs text-slate-400 mt-1">Slightly Acidic (Ideal)</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Scale: 0 - 14</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-bold text-slate-200">Rainfall Detection</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Optical Rain Sensor
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <span className="text-2xl font-extrabold text-indigo-300">
                {telemetry.rainDetected ? 'Rain Active 🌧️' : 'No Rain Detected ☀️'}
              </span>
              <p className="text-xs text-slate-400 mt-1">Intensity: {telemetry.rainIntensity}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="w-5 h-5 text-sky-400" />
              <span className="text-sm font-bold text-slate-200">Water Storage Tank</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Ultrasonic Sensor
            </span>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <span className="text-4xl font-extrabold text-sky-300">{telemetry.waterTankLevel}%</span>
              <p className="text-xs text-slate-400 mt-1">Reservoir Status: Good</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-slate-200">Irrigation Relay Switch</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Relay 12V
            </span>
          </div>

          <div className="flex items-center justify-between my-2">
            <div>
              <span className={`text-2xl font-extrabold ${telemetry.pumpStatus === 'ON' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                Pump {telemetry.pumpStatus}
              </span>
              <p className="text-xs text-slate-400">Mode: {telemetry.mode}</p>
            </div>
            <button
              onClick={togglePump}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                telemetry.pumpStatus === 'ON'
                  ? 'bg-rose-500 hover:bg-rose-400 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {telemetry.pumpStatus === 'ON' ? 'Stop Pump' : 'Start Pump'}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <span>Connected ESP32 Hardware Gateway Nodes</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {devices.map(device => (
            <div key={device.id} className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{device.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                  {device.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">ID: {device.id}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>IP: {device.IP}</span>
                <span>Battery: {device.battery}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
