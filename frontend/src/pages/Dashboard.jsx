import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Tractor, 
  Activity, 
  Sprout, 
  Scan, 
  Droplets, 
  AlertTriangle, 
  CheckCircle,
  Thermometer,
  Zap,
  TrendingUp
} from 'lucide-react';

export const Dashboard = ({ setCurrentPage }) => {
  const { role, user } = useAuth();
  const { farms, selectedFarm, notifications } = useFarm();
  const { telemetry, togglePump } = useTelemetry();

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-100">
              Welcome back, <span className="text-emerald-400">{user.name}</span>
            </h2>
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full capitalize">
              Role: {role === 'manager' ? 'Farm Manager' : 'Crop Specialist Farmer'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {role === 'manager' 
              ? `Overseeing ${farms.length} registered farms across 4 agricultural sectors.` 
              : `Assigned focus: ${selectedFarm.name} (${selectedFarm.crop})`}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentPage('monitoring')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 transition-all flex items-center space-x-2"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Live Sensors</span>
          </button>
          <button
            onClick={() => setCurrentPage('irrigation')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            <Droplets className="w-4 h-4" />
            <span>Irrigation Controls</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Soil Moisture</p>
            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">{telemetry.soilMoisture}%</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Target Range: 35% - 75%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Air Temperature</p>
            <h3 className="text-2xl font-extrabold text-teal-300 mt-1">{telemetry.temperature}°C</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">DHT22 Ambient Sensor</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-teal-300" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Soil pH Balance</p>
            <h3 className="text-2xl font-extrabold text-cyan-300 mt-1">{telemetry.soilPh}</h3>
            <p className="text-[10px] text-emerald-400 mt-0.5">Optimal for {selectedFarm.crop}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-cyan-300" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Smart Pump Status</p>
            <div className="flex items-center space-x-2 mt-1">
              <h3 className={`text-2xl font-extrabold ${telemetry.pumpStatus === 'ON' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                {telemetry.pumpStatus}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {telemetry.mode}
              </span>
            </div>
            <button 
              onClick={togglePump} 
              className="text-[10px] text-emerald-400 hover:underline mt-1 font-semibold block"
            >
              Toggle Pump Relay
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <Tractor className="w-5 h-5 text-emerald-400" />
                <span>{selectedFarm.name} Overview</span>
              </h3>
              <p className="text-xs text-slate-400">{selectedFarm.location} • {selectedFarm.size}</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Health Score: {selectedFarm.healthScore}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Current Crop</span>
              <p className="text-sm font-semibold text-slate-200">{selectedFarm.crop}</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Soil Classification</span>
              <p className="text-sm font-semibold text-slate-200">{selectedFarm.soilType}</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">IoT Gateway Nodes</span>
              <p className="text-sm font-semibold text-emerald-400">{selectedFarm.deviceCount} Active ESP32 Nodes</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-300 mb-3">Quick AI & Management Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setCurrentPage('recommendation')}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group"
              >
                <Sprout className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">AI Crop Advisor</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Get optimal crop & yield advice</p>
              </button>

              <button
                onClick={() => setCurrentPage('diagnosis')}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group"
              >
                <Scan className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Disease Diagnosis</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Upload leaf image for AI scan</p>
              </button>

              <button
                onClick={() => setCurrentPage('analytics')}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group"
              >
                <TrendingUp className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Analytics & Trends</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Water usage & temp graphs</p>
              </button>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center justify-between">
              <span>Recent Alerts</span>
              <span className="text-xs font-normal text-slate-400">{notifications.length} Total</span>
            </h3>
            <div className="space-y-2.5">
              {notifications.slice(0, 3).map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex items-start space-x-2">
                    {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                    {item.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                    {item.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                    <div>
                      <p className="font-semibold text-slate-200">{item.title}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{item.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('notifications')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-semibold transition-all text-center"
          >
            View Alerts Center →
          </button>
        </div>
      </div>
    </div>
  );
};
