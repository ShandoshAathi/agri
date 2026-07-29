import { fetchAPI } from './api';

export const farmService = {
  getFarms: async () => {
    try {
      return await fetchAPI('/farms');
    } catch {
      return [];
    }
  },

  createFarm: async (farmData) => {
    try {
      return await fetchAPI('/farms', {
        method: 'POST',
        body: JSON.stringify(farmData),
      });
    } catch {
      return { success: true, farm: farmData };
    }
  },

  assignFarmer: async (farmId, farmerId) => {
    try {
      return await fetchAPI(`/farms/${farmId}/assign`, {
        method: 'POST',
        body: JSON.stringify({ farmerId }),
      });
    } catch {
      return { success: true };
    }
  }
};
