import { defineStore } from 'pinia';
import axios, { AxiosRequestConfig } from 'axios';

interface IMfaState {
  shown: boolean;
  config?: AxiosRequestConfig<any> | null;
}

export enum EMfaHeaders {
  otp = 'x-otp-header',
  totp = 'x-totp-header',
  passcode = 'x-passcode-header',
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
        const _headers = this.config.headers || {};
        this.config.headers = Object.assign(_headers, {});
        if (data.otp) {
          this.config.headers[EMfaHeaders.otp] = data.otp;
        }
        if (data.totp) {
          this.config.headers[EMfaHeaders.totp] = data.totp;
        }
        if (data.passcode) {
          this.config.headers[EMfaHeaders.passcode] = data.passcode;
        }
        const res = await axios.request(this.config);
        return res;
      }
      return data;
    },
  },
});
