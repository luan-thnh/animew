import axiosClient from './axiosClient';

const authAPI = {
  getCurrentUser: async () => {
    return await axiosClient.get('/auth');
  },
  register: async (data: { username: string; email: string; password: string }) => {
    return await axiosClient.post('/auth/register', data);
  },
  login: async (data: { email: string; password: string }) => {
    return await axiosClient.post('/auth/login', data);
  },
};

export default authAPI;
