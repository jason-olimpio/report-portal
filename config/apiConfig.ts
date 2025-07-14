import {ApiMode, type ApiConfig} from '@types';

export const API_CONFIG: ApiConfig = {
  mode: ApiMode.Mock,

  baseUrl: 'https://your-api-endpoint.com/api',
  timeout: 10000,

  mockDelay: {
    min: 500,
    max: 2000,
  },

  axios: {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
} as const;

export const getApiDelay = (): number => {
  const {min, max} = API_CONFIG.mockDelay;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
