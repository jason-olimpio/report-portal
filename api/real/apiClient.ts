import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

import {API_CONFIG} from '@config'
import {getToken, removeToken} from '@utils'

const {baseUrl, axios: axiosConfig} = API_CONFIG

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: axiosConfig.timeout,
  headers: axiosConfig.headers,
})

const {interceptors} = axiosInstance

interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status !== 401) return Promise.reject(error)

    try {
      await removeToken()

      console.warn('Token removed due to 401 unauthorized response')
    } catch (error) {
      console.error('Error during 401 handling:', error)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
