import { defineStore } from 'pinia';
import axios, { AxiosRequestConfig } from 'axios';

type TMfaCallbackData = {
  title?: string;
  successRoute?: string;
  callback?: any;
};

interface IMfaState {
  shown: boolean;
  btnTitle: string;
  config?: AxiosRequestConfig<any> | null;
  data?: TMfaCallbackData;
}

export enum EMfaHeaders {
  otp = 'x-otp-code',
  totp = 'x-totp-code',
  passcode = 'x-pass-code',
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
    btnTitle: '',
    config: null,
  }),

  getters: {
    enabled: (state) => state.shown,
    getBtnTitle: (state) => state.data?.title,
  },

  actions: {
    show(data: TMfaCallbackData) {
      this.$reset();
      this.data = data;
      this.shown = true;
    },
    hide() {
      this.$reset();
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
        console.log('checkMfa', JSON.stringify(this.config.headers));
        const res = await axios.request(this.config);
        console.log('checkMfa', JSON.stringify(res));
        if (this.data?.callback) {
          this.data.callback();
        }
        return res;
      }
      return data;
    },
  },
});
