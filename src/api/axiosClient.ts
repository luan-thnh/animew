import axios, { AxiosResponse } from 'axios';

let token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token') as string)
  : null;

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
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
