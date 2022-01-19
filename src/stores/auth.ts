import { defineStore } from 'pinia';

// === Auth Types ===

export interface AuthState {
  registrationStep: number;
}

// === Auth Store ===

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    registrationStep: 1,
  }),

  getters: {
    getState: (state) => state,
  },

  actions: {
    setStep(step: number) {
      this.registrationStep = step;
    },
  },
});
