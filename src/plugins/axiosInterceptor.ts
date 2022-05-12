import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import apiService from '@/services/apiService';
import { useAuthStore } from '@/stores/auth';
import { i18n } from '@/i18n';
import { get } from '@/helpers/storage';
import router from '@/router';
import SentryUtil from '@/helpers/sentryUtil';

import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';
import { EMfaHeaders, useMfaStore } from '@/stores/mfa';

/*
 * This code prevent race condition with multiple parallel API calls
 */
let _refreshTokenRequest: Promise<void> | null = null;
let _cleanTokenDataRequest: Promise<void> | null = null;

const _refreshToken = async (): Promise<string | null> => {
  let token = await get(EStorageKeys.token);

  if (token) {
    const authStore = useAuthStore();
    //Check invalid token
    if (await authStore.verifyToken()) {
      if (_refreshTokenRequest === null) {
        _refreshTokenRequest = authStore.refresh();
      }
      await _refreshTokenRequest;
      _refreshTokenRequest = null;
      token = await get(EStorageKeys.token);
    }
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
): Promise<AxiosRequestConfig | null> => {
  const headers: AxiosRequestHeaders = {};

  // mfa headers
  const mfaStore = useMfaStore();
  // if (mfaStore.enabled && config.headers) {
  if (config.headers) {
    if (config.headers[EMfaHeaders.otp]) {
      const otp = String(config.headers[EMfaHeaders.otp]);
      headers[EMfaHeaders.otp] = otp;
    }
    if (config.headers?.[EMfaHeaders.totp]) {
      const totp = String(config.headers[EMfaHeaders.totp]);
      headers[EMfaHeaders.totp] = totp;
    }
    if (config.headers?.[EMfaHeaders.passcode]) {
      const passcode = String(config.headers[EMfaHeaders.passcode]);
      headers[EMfaHeaders.passcode] = passcode;
    }
  }

  config.timeout = 30000;
  config.headers = <AxiosRequestHeaders>headers;
  config.headers['Content-Type'] = 'application/json';
  config.headers.Accept = 'application/json';
  config.headers['Accept-Language'] = i18n.global.locale.value;

  try {
    if (config.url && !_notAuthorizedRoutes().includes(config.url)) {
      const token = await _refreshToken();
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
      if (mfaStore.enabled) {
        if (config.data?.isMfaRequest) {
          // remove temporary flag
          delete config.data.isMfaRequest;
        } else {
          // Store config and cancel requets
          mfaStore.saveConfig(config);
          return null;
        }
      }
    }
  } catch (error) {
    SentryUtil.capture(
      error,
      'AxiosInterceptor',
      'requestHandler',
      "can't refresh token"
    );
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
      const mfaStore = useMfaStore();
      // mfa cancel error case
      if (mfaStore.enabled && error instanceof TypeError) {
        return false;
      }
      if (error?.response?.status === 401) {
        const authStore = useAuthStore();
        /*
         * Clear only expired token and refresh token
         */
        if (_cleanTokenDataRequest === null) {
          _cleanTokenDataRequest = authStore.clearTokenData();
        }
        await _cleanTokenDataRequest;
        _cleanTokenDataRequest = null;
        router.push({ name: Route.WelcomeLogoScreen });
      }
      //Logger error
      return Promise.reject(error);
    }
  );
}
