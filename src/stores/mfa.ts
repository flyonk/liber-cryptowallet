// Кейсы по уровням безопасности
// Если есть биометрика показываем face / touch id ->

//   1. Если не установлен 2FA -> экран с ОТП
// 2. Если установлен 2FA -> экран с 2FA

// Если есть pascode и нет 2FA ->

//   Экран с passcode и OTP

// Если есть pascode и 2FA ->

//   Экран с passcode и 2FA

import { defineStore } from 'pinia';

interface IMfaState {
  shown: boolean;
  twofa: boolean;
  passcode: boolean;
  opt: boolean;
}

// === 2fa Store ===

export const useMfaStore = defineStore('mfa', {
  state: (): IMfaState => ({
    shown: false,
    twofa: false,
    passcode: false,
    opt: false,
  }),

  getters: {
    enabled: (state) => state.shown,
  },

  actions: {
    show() {
      this.shown = true;
    },
    hide() {
      this.shown = false;
    },
  },
});
