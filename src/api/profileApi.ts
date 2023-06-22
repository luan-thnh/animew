import axiosClient from './axiosClient';

const profileApi = {
  getProfile: () => {
    return axiosClient.get('/profile/');
  },
  createProfile: (params: string) => {
    return axiosClient.post('/profile/create', params);
  },
  updateProfile: (params: {
    fullName?: string;
    email?: string;
    address?: string;
    description?: string;
    level?: number;
  }) => {
    return axiosClient.put('/profile/update', params);
  },
  updateAvatar: async (data: { avatar: string }) => {
    return await axiosClient.post('/profile/avatar', data);
  },
};

export default profileApi;
