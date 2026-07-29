export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me'
  },
  FARMS: {
    LIST: '/farms',
    CREATE: '/farms',
    ASSIGN: (id) => `/farms/${id}/assign`
  },
  IOT: {
    TELEMETRY: (farmId) => `/iot/telemetry/${farmId}`,
    PUMP_CONTROL: (farmId) => `/iot/pump/${farmId}`
  },
  AI: {
    CROP_RECOMMENDATION: '/ai/crop-recommendation',
    DISEASE_DIAGNOSIS: '/ai/disease-diagnosis'
  }
};
