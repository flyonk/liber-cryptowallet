import { defineStore } from 'pinia';

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
  }),

  getters: {
    getModalStates: (state) => state.modalStates,

    getLoadingState: (state) => state.loadingState,
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
  },
});
