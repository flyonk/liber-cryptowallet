import { Storage } from '@capacitor/storage';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

import authService from '@/services/authService';
import { clearAll, get, set, remove } from '@/helpers/storage';
import { ISuccessSignIn } from '@/models/auth/successSignIn';
import SentryUtil from '@/helpers/sentryUtil';

import { EStorageKeys } from '@/types/storage';
import { EStepDirection } from '@/types/base-component';

// === Auth Types ===

export interface IAuthSteps {
  registration: number;
  login: number;
  recover: number;
  kyc: number;
}

export interface ICommonPhoneNumber {
  dialCode: string;
  phone: string;
}

export interface IAuthRegistration extends ICommonPhoneNumber {
  email: string;
}

export interface IAuthState {
  steps: IAuthSteps;
  registration: IAuthRegistration;
  login: ICommonPhoneNumber;
  token: {
    token: string | null;
    refreshToken: string | null;
  };
}

// === Auth Store ===
// TODO: Save to Storage phone number
// TODO: Restore from Storage saved phone number
export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    steps: {
      registration: 0,
      login: 0,
      recover: 0,
      kyc: 0,
    },
    registration: {
      dialCode: '+7',
      phone: '',
      email: '',
    },
    login: {
      dialCode: '',
      phone: '',
    },
    token: {
      token: null,
      refreshToken: null,
    },
  }),

  getters: {
    getState: (state) => state,
    getLoginPhone: (state) => state.login.dialCode + state.login.phone,
    getRegistrationPhone: (state) =>
      state.registration.dialCode + state.registration.phone,
    getToken: ({ token }) => token,
    isLoggedIn: ({ token }) => !!token.token && !!token.refreshToken,
  },

  actions: {
    async recoverTokenData(): Promise<void> {
      const { value: token } = await Storage.get({
        key: EStorageKeys.token,
      });
      const { value: refreshToken } = await Storage.get({
        key: EStorageKeys.refreshToken,
      });

      if (token && refreshToken)
        this.token = { ...this.token, token, refreshToken };
    },

    setStep(step: number | EStepDirection, scope: keyof IAuthSteps) {
      if (step === EStepDirection.next) {
        this.steps[scope] = this.steps[scope] + 1;
      } else if (step === EStepDirection.prev) {
        this.steps[scope] = this.steps[scope] - 1;
      } else {
        this.steps[scope] = step;
      }
    },

    async signIn(_data: {
      phone: string;
      flow: 'login' | 'signup';
    }): Promise<void> {
      await authService.signIn(_data);
      this.savePhone(_data.flow);
    },

    async signInProceed(_data: {
      phone: string;
      otp: string;
    }): Promise<boolean> {
      const data = await authService.signInProceed(_data);

      this.setToken(data);
      return true;
    },

    async refresh(): Promise<void> {
      try {
        const refreshToken = await get(EStorageKeys.refreshToken);
        const data = await authService.refresh({
          refresh_token: refreshToken || '',
        });
        this.setToken(data);
      } catch (err) {
        SentryUtil.capture(
          err,
          'refresh',
          'authStore',
          "error can't refresh token"
        );
      }
    },

    async setToken(data = null as ISuccessSignIn | null): Promise<void> {
      if (data) {
        const decodedToken = jwt_decode<JwtPayload>(data.token || '') || null;
        if (decodedToken?.exp)
          await Storage.set({
            key: EStorageKeys.tokenExpire,
            value: String(decodedToken.exp),
          });
        await Promise.all([
          Storage.set({
            key: EStorageKeys.token,
            value: data.token,
          }),
          Storage.set({
            key: EStorageKeys.refreshToken,
            value: data.refreshToken,
          }),
        ]);

        this.token = { ...this.token, ...data };
      }
    },

    async verifyToken(): Promise<boolean> {
      const expireTokenDate = await get(EStorageKeys.tokenExpire);
      const dateTimeObj = DateTime.fromSeconds(Number(expireTokenDate));
      return dateTimeObj.valueOf() < Date.now();
    },

    async checkAuthorizedUser(): Promise<boolean> {
      return !!(await Storage.get({ key: EStorageKeys.token })).value;
    },

    async savePhone(type: 'login' | 'signup'): Promise<void> {
      const value =
        type === 'login'
          ? JSON.stringify(this.login)
          : JSON.stringify(this.registration);
      await Storage.set({
        key: EStorageKeys.phone,
        value,
      });
    },

    async recoverPhoneFromStorage(): Promise<Record<string, string>> {
      const json = await get(EStorageKeys.phone);
      return json ? JSON.parse(json) : { dialCode: '', phone: '' };
    },

    async getDevices() {
      return await authService.devices();
    },

    //TODO: rename method ex: getPhoneFromStorage
    async getFromStorage() {
      const [dialCode, phone] = await Promise.all([
        get('dialCode'),
        get('phone'),
      ]);

      if (dialCode === 'null' || dialCode === null) {
        this.login.dialCode = '+7';
      } else {
        this.login.dialCode = dialCode;
      }

      if (phone === 'null' || phone === null) {
        this.login.phone = '';
      } else {
        this.login.phone = phone;
      }

      // this.login.dialCode = dialCode || '+7';
    },

    //TODO: rename method ex: setPhoneToStorage
    async setToStorage() {
      await Promise.all([
        set({
          key: 'dialCode',
          value: this.login.dialCode,
        }),
        set({
          key: 'phone',
          value: this.login.phone,
        }),
      ]);
    },

    setPhone(phone: string) {
      this.login.phone = phone;
    },

    setDialCode(dialCode: string) {
      this.login.dialCode = dialCode;
    },

    async logout() {
      const [dialCode, phone, access_token, touchid, faceid] =
        await Promise.all([
          get('dialCode'),
          get('phone'),
          get('access_token'),
          get(EStorageKeys.touchid),
          get(EStorageKeys.faceid),
        ]);

      authService.logout({ access_token: access_token as string });

      await clearAll();

      await Promise.all([
        set({
          key: 'dialCode',
          value: dialCode as string,
        }),
        set({
          key: 'phone',
          value: phone as string,
        }),
        set({
          key: EStorageKeys.touchid,
          value: touchid || '',
        }),
        set({
          key: EStorageKeys.faceid,
          value: faceid || '',
        }),
      ]);
    },

    async clearTokenData(): Promise<void> {
      await Promise.all([
        remove(EStorageKeys.token),
        remove(EStorageKeys.refreshToken),
        remove(EStorageKeys.tokenExpire),
      ]);
    },
  },
});
