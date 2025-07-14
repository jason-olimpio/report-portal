import axios, {AxiosInstance} from 'axios';

import {API_CONFIG} from '@config';
import {getToken, removeToken} from '@utils';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.baseUrl,
    timeout: API_CONFIG.axios.timeout,
    headers: API_CONFIG.axios.headers,
  });

  instance.interceptors.request.use(
    async config => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      try {
        await removeToken();

        console.warn('Token removed due to 401 unauthorized response');
      } catch (tokenRemovalError) {
        console.error('Error during 401 handling:', tokenRemovalError);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default createAxiosInstance;
