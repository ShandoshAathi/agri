import { useEffect, useState } from 'react';

export function useTelemetryStream(initialData) {
  const [telemetry, setTelemetry] = useState(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        soilMoisture: Math.min(95, Math.max(15, parseFloat((prev.soilMoisture + (Math.random() * 0.4 - 0.2)).toFixed(1)))),
        temperature: parseFloat((27.0 + (Math.random() * 1.0 - 0.5)).toFixed(1)),
        lastUpdated: new Date().toLocaleTimeString()
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return telemetry;
}
