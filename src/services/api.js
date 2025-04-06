import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL_prod || import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
  baseURL: `${backend}/api`,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
