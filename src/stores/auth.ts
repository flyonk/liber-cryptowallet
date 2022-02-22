import { EStepDirection } from '@/types/base-component';
import { defineStore } from 'pinia';

// === Auth Types ===

export interface IAuthSteps {
  registration: number;
  login: number;
  recover: number;
}

export interface ICommonPhoneNumber {
  dialCode: string,
  phone: string,
}

export interface IAuthRegistration extends ICommonPhoneNumber {
  email: string
}

export interface IAuthState {
  steps: IAuthSteps;
  registration: IAuthRegistration,
  login: ICommonPhoneNumber
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
      dialCode: "+7",
      phone: "9082359632",
      email: ""
    },
    login: {
      dialCode: "+7",
      phone: "9082359632"
    }
  }),

  getters: {
    getState: (state) => state,
    getLoginPhone: (state) => state.login.dialCode + state.login.phone,
    getRegistrationPhone: (state) => state.registration.dialCode + state.registration.phone
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
  },
});
