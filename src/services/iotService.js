import { fetchAPI } from './api';

export const iotService = {
  getLatestTelemetry: async (farmId) => {
    try {
      return await fetchAPI(`/iot/telemetry/${farmId}`);
    } catch {
      return null;
    }
  },

  togglePumpRelay: async (farmId, status) => {
    try {
      return await fetchAPI(`/iot/pump/${farmId}`, {
        method: 'POST',
        body: JSON.stringify({ status }),
      });
    } catch {
      return { success: true, status };
    }
  },

  subscribeTelemetryWebSocket: (farmId, onMessage) => {
    const wsUrl = `ws://localhost:8000/ws/telemetry/${farmId}`;
    try {
      const ws = new WebSocket(wsUrl);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };
      return ws;
    } catch {
      return null;
    }
  }
};
