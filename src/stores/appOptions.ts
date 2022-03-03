import { defineStore } from 'pinia';
import { Storage } from '@capacitor/storage';
import { EStorageKeys } from '@/types/base-component';

interface IappOptionsState {
  notifictions: boolean | null;
  faceid: boolean | null;
  touchid: boolean | null;
}

const getStoredOption = async (key: EStorageKeys) => {
  const { value } = await Storage.get({
    key,
  });
  return value || null;
};

async function setOptions(value: string, key: EStorageKeys) {
  await Storage.set({
    key,
    value,
  });
}

// === 2fa Store ===

export const useAppOptionsStore = defineStore('appOptions', {
  state: (): IappOptionsState => ({
    notifictions: null,
    faceid: null,
    touchid: null,
  }),

  getters: {
    isItFirstRun: (state) => {
      const notificationsSet = state.notifictions === null;
      const touchidSet = state.touchid === null;
      const faceidSet = state.touchid === null;
      return notificationsSet && faceidSet && touchidSet;
    },
    getOptions: (state) => state,
  },

  actions: {
    setOptions,
    async init() {
      const notifications = await getStoredOption(EStorageKeys.notifications);
      const faceid = await getStoredOption(EStorageKeys.faceid);
      const touchid = await getStoredOption(EStorageKeys.touchid);
      this.notifictions = notifications === null ? null : !!notifications;
      this.faceid = faceid === null ? null : !!faceid;
      this.touchid = touchid === null ? null : !!touchid;
    },
  },
});
