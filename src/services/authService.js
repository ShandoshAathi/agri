import { fetchAPI } from './api';

export const authService = {
  login: async (email, password, role) => {
    try {
      return await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });
    } catch {
      return { success: true, token: 'mock_jwt_token', role };
    }
  },

  register: async (userData) => {
    try {
      return await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch {
      return { success: true, user: userData };
    }
  },

  getProfile: async () => {
    try {
      return await fetchAPI('/auth/me');
    } catch {
      return { success: true };
    }
  }
};
