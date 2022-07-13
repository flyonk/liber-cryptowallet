import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

import { useRecipientsStore } from '@/stores/recipients';

import authService from '@/services/authService';
import { clearAll, get, remove, set } from '@/helpers/storage';
import { ISuccessSignIn } from '@/models/auth/successSignIn';

import { EStorageKeys, SStorageKeys } from '@/types/storage';
import { EStepDirection } from '@/types/base-component';
import { useErrorsStore } from '@/stores/errors';

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
// TODO: Restore from Storage saved phone number
// TODO: make a unique object from registration and login
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
    getLoginDialCode: (state) => state.login.dialCode,
    getLoginSubscriberPhone: (state) => state.login.phone,
    getRegistrationPhone: (state) =>
      state.registration.dialCode + state.registration.phone,
    getToken: ({ token }) => token,
    isLoggedIn: ({ token }) => !!token.token && !!token.refreshToken,
  },

  actions: {
    async resetDependantStores() {
      const store = useRecipientsStore();

      store.$reset();
    },
    async recoverTokenData(): Promise<void> {
      const token = await get(EStorageKeys.token);
      const refreshToken = await get(EStorageKeys.refreshToken);

      if (token && refreshToken) {
        this.token = { ...this.token, token, refreshToken };
      }
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
      await this.resetDependantStores();
      this.savePhone(_data.flow);
    },

    async signInProceed(_data: {
      phone: string;
      otp: string;
      code_2fa: string;
    }): Promise<boolean> {
      const data = await authService.signInProceed(_data);

      await this.setToken(data);
      await this.resetDependantStores();
      return true;
    },

    async refresh(): Promise<void> {
      try {
        const refreshToken = await get(EStorageKeys.refreshToken);
        const data = await authService.refresh({
          refresh_token: refreshToken || '',
        });
        await this.setToken(data);
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'auth.ts',
          ctx: 'refresh',
          description: "Error can't refresh token",
        });
      }
    },

    async setToken(data = null as ISuccessSignIn | null): Promise<void> {
      if (data) {
        const decodedToken = jwt_decode<JwtPayload>(data.token || '') || null;
        if (decodedToken?.exp)
          await set({
            key: EStorageKeys.tokenExpire,
            value: String(decodedToken.exp),
          });
        await Promise.all([
          set({
            key: EStorageKeys.token,
            value: data.token,
          }),
          set({
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
      return !!(await get(EStorageKeys.token));
    },

    async savePhone(type: 'login' | 'signup'): Promise<void> {
      const value =
        type === 'login'
          ? JSON.stringify(this.login)
          : JSON.stringify(this.registration);
      await set({
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

    async setPhoneToStorage() {
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

    async logout(userId: string) {
      const [dialCode, phone, touchId, faceId] = await Promise.all([
        get('dialCode'),
        get('phone'),
        get(EStorageKeys.touchid),
        get(EStorageKeys.faceid),
      ]);

      SecureStoragePlugin.remove({ key: SStorageKeys.user });

      if (this.token.token) {
        authService.logout({ user_id: userId });
      }

      this.token = { token: null, refreshToken: null };

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
      ]);
      if (touchId)
        await set({
          key: EStorageKeys.touchid,
          value: touchId,
        });
      if (faceId)
        await set({
          key: EStorageKeys.faceid,
          value: faceId,
        });
    },

    async clearTokenData(): Promise<void> {
      await Promise.all([
        remove(EStorageKeys.token),
        remove(EStorageKeys.refreshToken),
        remove(EStorageKeys.tokenExpire),
      ]);
      this.$reset();
    },
  },
});
