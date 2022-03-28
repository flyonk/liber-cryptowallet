import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Storage } from '@capacitor/storage';

import apiService from '@/services/apiService';
import { useAuthStore } from '@/stores/auth';
import { i18n } from '@/i18n';

import { EStorageKeys } from '@/types/storage';

//TODO: what API calls should be authorized
const _notAuthorizedRoutes = (): string[] => {
  return [
    ...Object.values(apiService.auth).map((item) => item()),
    ...Object.values(apiService.localData).map((item) => item()),
  ];
};

const _requestHandler = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  config.timeout = 30000;
  config.headers = <AxiosRequestHeaders>{};
  config.headers['Content-Type'] = 'application/json';
  config.headers.Accept = 'application/json';
  config.headers['Accept-Language'] = i18n.global.locale.value;
  /*
   * TODO: set authorized API calls logic
   */
  try {
    if (config.url && !_notAuthorizedRoutes().includes(config.url)) {
      const { value: token } = await Storage.get({
        key: EStorageKeys.token,
      });

      if (token) {
        const authStore = useAuthStore();
        if (await authStore.verifyToken()) {
          await authStore.refresh();
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.log('return config erorr', error);
  }
  return config;
};

export default function init(): void {
  axios.interceptors.request.use(
    (request) => _requestHandler(request),
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //TODO: define scenarios
        //Logout -> SignIn screen ?
      }
      //TODO: log to sentry
      console.error(`error: ${error}`);
      return Promise.reject(error);
    }
  );
}
