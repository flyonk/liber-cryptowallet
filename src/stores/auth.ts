import authService from '@/services/authService';
import { EStepDirection } from '@/types/base-component';
import { Storage } from '@capacitor/storage';
import { ISuccessSignIn } from '@/models/auth/successSignIn';

import { defineStore } from 'pinia';

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
          Storage.set({
            key: 'access_token',
            value: data.token,
          }),
          Storage.set({
            key: 'refresh_token',
            value: data.refreshToken,
          }),
        ]);

        this.token = { ...this.token, ...data };
      } else {
        const { value: token } = await Storage.get({
          key: 'access_token',
        });
        const { value: refreshToken } = await Storage.get({
          key: 'refresh_token',
        });

        this.token = { ...this.token, token, refreshToken };
      }
    },

    async getDevices() {
      return await authService.devices();
    },
  },
});
