// API Configuration helper for NurseCalc
// Uses VITE_API_URL if provided, otherwise in development falls back to http://localhost:5000
// When served via Nginx reverse proxy in Docker or production, falls back to relative '' (i.e. /api/...)
const API_BASE_URL = (import.meta.env.VITE_API_URL !== undefined)
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.DEV ? 'http://localhost:5000' : '');

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default API_BASE_URL;
