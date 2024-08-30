// src/services/axios.js
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:9099',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
