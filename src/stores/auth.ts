import AuthService from '@/services/AuthService';
import { EStepDirection } from '@/types/base-component';
import { Storage } from '@capacitor/storage';
import { TErrorResponse } from './../types/api';
import { TSuccessSignIn } from '@/types/api';
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
    access_token: string | null;
    refresh_token: string | null;
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
      access_token: null,
      refresh_token: null,
    },
  }),

  getters: {
    getState: (state) => state,
    getLoginPhone: (state) => state.login.dialCode + state.login.phone,
    getRegistrationPhone: (state) =>
      state.registration.dialCode + state.registration.phone,
    getToken: ({ token }) => token,
    isLoggedIn: ({ token }) => !!token.access_token && !!token.refresh_token,
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

    async signInProceed(_data: {
      phone: string;
      otp: string;
    }): Promise<void | TErrorResponse> {
      try {
        const authService = new AuthService();

        const { data } = await authService.signInProceed(_data);

        this.setToken(data);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async setToken(data = null as TSuccessSignIn | null): Promise<void> {
      if (data) {
        await Promise.all([
          Storage.set({
            key: 'access_token',
            value: data.access_token,
          }),
          Storage.set({
            key: 'refresh_token',
            value: data.refresh_token,
          }),
        ]);

        this.token = { ...this.token, ...data };
      } else {
        const { value: access_token } = await Storage.get({
          key: 'access_token',
        });
        const { value: refresh_token } = await Storage.get({
          key: 'refresh_token',
        });

        this.token = { ...this.token, access_token, refresh_token };
      }
    },
  },
});
