import { defineStore } from 'pinia';

import { IToast } from '@/types/toast';

export interface IModalStates {
  sendMenu: boolean;
}

export interface ILoadingState {
  dashboard: boolean;
}

export interface IUIStoreState {
  modalStates: IModalStates;

  loadingState: ILoadingState;

  loadingStateOnce?: string[];

  toasts: IToast[];
}

export const useUIStore = defineStore('ui', {
  state: (): IUIStoreState => ({
    modalStates: {
      sendMenu: false,
    },

    loadingState: {
      dashboard: false,
    },

    loadingStateOnce: [],

    toasts: [],
  }),

  getters: {
    getModalStates: (state) => state.modalStates,

    getLoadingState: (state) => state.loadingState,

    getToasts: (state) => state.toasts,
  },

  actions: {
    setStateModal(scope: keyof IModalStates, state = true) {
      this.modalStates[scope] = state;
    },

    setLoadingState(scope: keyof ILoadingState, state: boolean) {
      this.loadingState[scope] = state;
    },

    setLoadingStateOnce(scope: keyof ILoadingState, state: boolean) {
      if (!this.loadingStateOnce?.includes(scope)) {
        this.loadingState[scope] = state;
        this.loadingStateOnce?.push(scope);
      }
    },

    showToast(toastData: IToast) {
      this.toasts = [...this.toasts, toastData];
    },

    deleteToast() {
      const [, ...restToasts] = this.toasts;

      this.toasts = restToasts;
    },
  },
});
