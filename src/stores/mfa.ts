import { defineStore } from 'pinia';
import axios, { AxiosRequestConfig } from 'axios';

interface IMfaState {
  shown: boolean;
  config?: AxiosRequestConfig<any> | null;
}

// type for record event occur time
type TMfaData = {
  otp?: string;
  totp?: string;
  passcode?: string;
};

// === 2fa Store ===

export const useMfaStore = defineStore('mfa', {
  state: (): IMfaState => ({
    shown: false,
    config: null,
  }),

  getters: {
    enabled: (state) => state.shown,
  },

  actions: {
    show() {
      this.shown = true;
    },
    hide() {
      this.config = null;
      this.shown = false;
    },
    saveConfig(config: AxiosRequestConfig<any>) {
      this.config = config;
      // mark config ad mfa
      if (this.config.data) {
        this.config.data['isMfaRequest'] = true;
      } else {
        this.config.data = {
          isMfaRequest: true,
        };
      }
    },
    async checkMfa(data: TMfaData) {
      if (this.config) {
        const _data = this.config.data || {};
        this.config.data = Object.assign(_data, data);
        await axios.request(this.config);
      }
      return data;
    },
  },
});
