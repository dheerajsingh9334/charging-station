import api from './api';

export const AuthService = {
  async register(email: string, password: string, name: string) {
    const response = await api.post('/user/signup', { email, password, name });
 console.log('Raw response from AuthService:', response);
 return response;

  },

  async login(email: string, password: string) {
    return await api.post('/user/login', { email, password });
  }
};