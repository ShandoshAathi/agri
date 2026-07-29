import React from 'react';
import { Temperature } from './Temperature';
import { Humidity } from './Humidity';
import { SoilMoisture } from './SoilMoisture';
import { SoilPH } from './SoilPH';
import { WaterLevel } from './WaterLevel';
import { PumpStatus } from './PumpStatus';
import { Activity, Wifi } from 'lucide-react';

export const SensorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>ESP32 Sensor Telemetry Node</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Live MQTT Telemetry Stream (2-Second Sampling)</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-semibold">
          <Wifi className="w-4 h-4 animate-pulse" />
          <span>Gateway Active</span>
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
