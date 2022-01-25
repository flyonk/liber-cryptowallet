import { defineStore } from 'pinia';

// === Auth Types ===

export interface AuthSteps {
  registration: number;
  login: number;
  recover: number;
}

export interface AuthState {
  steps: AuthSteps;
}

// === Auth Store ===

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
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
    setStep(step: number, scope: keyof AuthSteps) {
      this.steps[scope] = step;
    },
  },
});
