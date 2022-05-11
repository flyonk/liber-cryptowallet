import { defineStore } from 'pinia';

export interface IModalStates {
  sendMenu: boolean;
}

export interface IUIStoreState {
  modalStates: IModalStates;
}

export const useUIStore = defineStore('ui', {
  state: (): IUIStoreState => ({
    modalStates: {
      sendMenu: false,
    },
  }),

  getters: {
    getModalStates: (state) => state.modalStates,
  },

  actions: {
    setStateModal(scope: keyof IModalStates, state = true) {
      this.modalStates[scope] = state;
    },
  },
});
