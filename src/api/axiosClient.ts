import axios, { AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || null;

  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse<any>) => response.data,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error.response?.data);
  },
);

export default axiosClient;
