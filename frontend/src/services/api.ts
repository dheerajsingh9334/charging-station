import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      const errorMessage = error.response.data.message || error.response.data.error || 'An error occurred';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      return Promise.reject(new Error('No response from server. Please check your internet connection.'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;