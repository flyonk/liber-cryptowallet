import { defineStore } from 'pinia';
import { AxiosError } from 'axios';

import { get, remove, set } from '@/helpers/storage';
import { useErrorsStore } from '@/stores/errors';

import { EStorageKeys } from '@/types/storage';

interface IappOptionsState {
  notifictions: boolean | null;
  faceid: boolean | null;
  touchid: boolean | null;
  showOfflineToast: boolean;
}

const registerNotification = async () => {
  // @TODO
  // Register push notification for PWA
};

async function setOptions(value: string, key: EStorageKeys) {
  if (!value) {
    await remove(key);

    return;
  }

  if (value && key === EStorageKeys.notifications) {
    await registerNotification();
  }

  await set({
    key,
    value,
  });
}

// === Options Store ===

export const useAppOptionsStore = defineStore('appOptions', {
  state: (): IappOptionsState => ({
    notifictions: null,
    faceid: null,
    touchid: null,
    showOfflineToast: false,
  }),

  getters: {
    isItFirstRun: (state) => {
      const notificationsSet = state.notifictions === null;
      const touchidSet = state.touchid === null;
      const faceidSet = state.touchid === null;
      return notificationsSet && faceidSet && touchidSet;
    },
    getOptions: (state) => state,
    isOfflineToastActive: (state) => state.showOfflineToast,
  },

  actions: {
    setOptions,
    async init() {
      const notifications = (await get(EStorageKeys.notifications)) || null;
      const faceid = (await get(EStorageKeys.faceid)) || null;
      const touchid = (await get(EStorageKeys.touchid)) || null;
      this.notifictions = notifications === null ? null : !!notifications;
      this.faceid = faceid === null ? null : !!faceid;
      this.touchid = touchid === null ? null : !!touchid;
    },

    async checkPassCode(): Promise<boolean> {
      return (await get(EStorageKeys.passcode)) === 'true';
    },

    setOfflineToast(value: boolean, error: AxiosError | Error | any) {
      this.showOfflineToast = value;
      useErrorsStore().handleCustom({
        err: error,
        title: 'offlineTitle',
        ctx: 'try to do create action in offline mode',
        description: 'offlineDescription',
        display: true,
        severity: 'offline',
        confirmTitle: 'confirmTitle',
        cancelTitle: 'cancelTitle',
        confirmCallback: () => useErrorsStore().hideError(),
        cancelCallback: () => useErrorsStore().hideError(),
      });
    },
  },
});
