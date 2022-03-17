import authService from '@/services/authService';
import { EStepDirection } from '@/types/base-component';
import { ISuccessSignIn } from '@/models/auth/successSignIn';

import { defineStore } from 'pinia';
import { clearAll, get, set } from '@/helpers/storage';

// === Auth Types ===

export interface IAuthSteps {
  registration: number;
  login: number;
  recover: number;
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

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    steps: {
      registration: 0,
      login: 0,
      recover: 0,
    },
    registration: {
      dialCode: '+7',
      phone: '9082359632',
      email: '',
    },
    login: {
      dialCode: '+7',
      phone: '9082359632',
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
    setStep(step: number | EStepDirection, scope: keyof IAuthSteps) {
      if (step === EStepDirection.next) {
        this.steps[scope] = this.steps[scope] + 1;
      } else if (step === EStepDirection.prev) {
        this.steps[scope] = this.steps[scope] - 1;
      } else {
        this.steps[scope] = step;
      }
    },

    async signInProceed(_data: { phone: string; otp: string }): Promise<void> {
      const data = await authService.signInProceed(_data);

      this.setToken(data);
    },

    async setToken(data = null as ISuccessSignIn | null): Promise<void> {
      if (data) {
        await Promise.all([
          set({
            key: 'access_token',
            value: data.token,
          }),
          set({
            key: 'refresh_token',
            value: data.refreshToken,
          }),
        ]);

        this.token = { ...this.token, ...data };
      } else {
        const token = await get('access_token');
        const refreshToken = await get('refresh_token');

        this.token = { ...this.token, token, refreshToken };
      }
    },

    async getDevices() {
      return await authService.devices();
    },

    async getFromStorage() {
      const [dialCode, phone] = await Promise.all([
        get('dialCode'),
        get('phone'),
      ]);

      if (phone) {
        this.login.phone = phone;
      }

      this.login.dialCode = dialCode || '+7';
    },

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
      const [dialCode, phone, access_token] = await Promise.all([
        get('dialCode'),
        get('phone'),
        get('access_token'),
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
      ]);
    },
  },
});
