// AgriSense AI API Client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('agri_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[AgriSense API Fallback Mode]: ${endpoint} - ${error.message}`);
    throw error;
  }
}
