import { fetchAPI } from './api';

export const aiService = {
  getRecommendation: async (params) => {
    try {
      return await fetchAPI('/ai/crop-recommendation', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    } catch {
      return null;
    }
  },

  diagnoseLeafDisease: async (formData) => {
    try {
      return await fetchAPI('/ai/disease-diagnosis', {
        method: 'POST',
        body: formData,
        headers: {}, // FormData headers automatically handled by fetch
      });
    } catch {
      return null;
    }
  }
};
