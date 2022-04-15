import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import apiService from '@/services/apiService';
import { useAuthStore } from '@/stores/auth';
import { i18n } from '@/i18n';
import { get } from '@/helpers/storage';
import router from '@/router';
import SentryUtil from '@/helpers/sentryUtil';

import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';

/*
 * Multiple parallel API calls handling
 */
let _isRefreshing = false;
let _refreshQueue = [] as Array<(token: string) => void>;

const _subscribeTokenRefresh = (cb: (token: string) => void) => {
  _refreshQueue.push(cb);
};

const _onRefreshed = (token: string) => {
  _refreshQueue.map((cb) => cb(token));
};

const _refreshToken = async (token: string): Promise<string> => {
  const authStore = useAuthStore();
  if (await authStore.verifyToken()) {
    await authStore.refresh();
    return (await get(EStorageKeys.token)) as string;
  }
  return token;
};

/*
 * Not protected routes list
 */
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
      const token = await get(EStorageKeys.token);

      if (token && !_isRefreshing) {
        const newToken = await _refreshToken(token);
        config.headers['Authorization'] = `Bearer ${newToken}`;
      }
    }
  } catch (error) {
    console.log('return config error', error);
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
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      if (config && status && status === 401) {
        // console.log('STATUS', status);
        if (!_isRefreshing) {
          _isRefreshing = true;
          const token = await get(EStorageKeys.token);
          if (token) {
            const newToken = await _refreshToken(token);
            _isRefreshing = false;
            _onRefreshed(newToken);
            _refreshQueue = [];
          } else {
            SentryUtil.capture(
              error,
              'refresh token',
              'async parallel calls',
              'token absent',
              { config }
            );
            router.push({ name: Route.WelcomeLogoScreen });
          }
        }
        return new Promise((resolve) => {
          _subscribeTokenRefresh((token) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(axios(config));
          });
        });
        // const authStore = useAuthStore();
        // /*
        //  * Clear only expired token and refresh token
        //  */
        // await authStore.clearTokenData();
        // router.push({ name: Route.WelcomeLogoScreen });
      }
      //Logger error
      return Promise.reject(error);
    }
  );
}
