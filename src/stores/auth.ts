import { defineStore } from 'pinia';

// === Auth Types ===

export interface IAuthSteps {
  registration: number;
  login: number;
  recover: number;
}

export interface IAuthState {
  steps: IAuthSteps;
}

// === Auth Store ===

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    steps: {
      registration: 0,
      login: 0,
      recover: 0,
    },
  }),

  getters: {
    getState: (state) => state,
  },

  actions: {
    setStep(step: number, scope: keyof IAuthSteps) {
      this.steps[scope] = step;
    },
  },
});
