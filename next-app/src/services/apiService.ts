import { AuthResponse } from '@/types';
import { getAccessToken, removeAccessTokenFromCookie, saveAccessTokenToCookie } from '@/utils';
import axios, { AxiosInstance } from 'axios';
class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.response.use((config) => {
      const accessToken = getAccessToken();
      if (config?.headers && accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (config) => config,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await this.getNewTokens();
            return this.axiosInstance(originalRequest);
          } catch (error) {
            removeAccessTokenFromCookie();
          }
        }
        throw error;
      },
    );
  }

  async login(username: string, password: string) {
    return (await this.axiosInstance.post<AuthResponse>('/auth/login', { username, password }))
      .data;
  }

  async getNewTokens() {
    const response = await this.axiosInstance.post<AuthResponse>('/auth/access-token');
    if (response.data.accessToken) {
      saveAccessTokenToCookie(response.data.accessToken);
    }
  }

  async logout() {
    return (await this.axiosInstance.post<boolean>('/auth/logout')).data;
  }
}

export const apiService = new ApiService();
