/* eslint-disable react/only-export-components, react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFarm } from './FarmContext';

const TelemetryContext = createContext();

export const TelemetryProvider = ({ children }) => {
  const { settings } = useFarm();

  const [telemetry, setTelemetry] = useState({
    temperature: 27.4,
    humidity: 64,
    soilMoisture: 38,
    soilPh: 6.4,
    rainDetected: false,
    rainIntensity: 'None',
    waterTankLevel: 82,
    pumpStatus: 'OFF',
    mode: 'AUTOMATIC',
    lastUpdated: new Date().toLocaleTimeString(),
  });

  const [telemetryHistory, _setTelemetryHistory] = useState([
    { time: '12:00', temp: 25.1, moisture: 45, humidity: 68, ph: 6.4 },
    { time: '12:15', temp: 25.8, moisture: 43, humidity: 66, ph: 6.4 },
    { time: '12:30', temp: 26.4, moisture: 41, humidity: 65, ph: 6.5 },
    { time: '12:45', temp: 27.0, moisture: 39, humidity: 64, ph: 6.4 },
    { time: '13:00', temp: 27.4, moisture: 38, humidity: 64, ph: 6.4 },
  ]);

  const togglePump = () => {
    setTelemetry(prev => {
      const nextStatus = prev.pumpStatus === 'ON' ? 'OFF' : 'ON';
      return { ...prev, pumpStatus: nextStatus };
    });
  };

  const setIrrigationMode = (newMode) => {
    setTelemetry(prev => ({ ...prev, mode: newMode }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        let deltaMoisture = prev.pumpStatus === 'ON' ? 0.8 : -0.2;
        let nextMoisture = Math.min(95, Math.max(15, parseFloat((prev.soilMoisture + deltaMoisture).toFixed(1))));
        let nextTemp = parseFloat((27.0 + (Math.random() * 1.2 - 0.6)).toFixed(1));
        let nextHumidity = Math.round(64 + (Math.random() * 4 - 2));
        let nextPh = parseFloat((6.4 + (Math.random() * 0.1 - 0.05)).toFixed(2));
        let nextTank = prev.pumpStatus === 'ON' ? Math.max(5, prev.waterTankLevel - 0.1) : prev.waterTankLevel;

        let nextPump = prev.pumpStatus;
        if (prev.mode === 'AUTOMATIC' && settings.autoIrrigation) {
          if (nextMoisture < settings.minSoilMoistureThreshold && !prev.rainDetected && nextTank > settings.tankMinLevel) {
            nextPump = 'ON';
          } else if (nextMoisture >= settings.maxSoilMoistureThreshold || prev.rainDetected || nextTank <= settings.tankMinLevel) {
            nextPump = 'OFF';
          }
        }

        return {
          ...prev,
          temperature: nextTemp,
          humidity: nextHumidity,
          soilMoisture: nextMoisture,
          soilPh: nextPh,
          waterTankLevel: parseFloat(nextTank.toFixed(1)),
          pumpStatus: nextPump,
          lastUpdated: new Date().toLocaleTimeString()
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [settings]);

  const currentReading = React.useMemo(() => ({
    soil_moisture: telemetry.soilMoisture,
    soilMoisture: telemetry.soilMoisture,
    temperature: telemetry.temperature,
    humidity: telemetry.humidity,
    soil_ph: telemetry.soilPh,
    soilPh: telemetry.soilPh,
    water_tank_level: telemetry.waterTankLevel,
    waterTankLevel: telemetry.waterTankLevel,
    pump_status: telemetry.pumpStatus,
    pumpStatus: telemetry.pumpStatus,
    rain_detected: telemetry.rainDetected,
    rainDetected: telemetry.rainDetected,
  }), [telemetry]);

  const value = React.useMemo(() => ({
    telemetry,
    currentReading,
    telemetryHistory,
    togglePump,
    setIrrigationMode,
    setTelemetry
  }), [telemetry, currentReading, telemetryHistory]);

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => useContext(TelemetryContext);
