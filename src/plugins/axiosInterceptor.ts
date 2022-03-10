import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import apiService from '@/services/apiService';
import { i18n } from '@/i18n';

//TODO: what API calls should be authorized
const _notAuthorizedRoutes = (): string[] => {
  return Object.values(apiService.auth).map((item) => item());
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
  if (config.url && !_notAuthorizedRoutes().includes(config.url)) {
    //let token = //TODO: Retrieve token from store
    //TODO: add refresh token logic
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
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
