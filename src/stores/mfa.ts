import { defineStore } from 'pinia';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export enum EConfirmationTypes {
  email = 'email',
  number = 'number',
  totp = 'totp',
  otp = 'otp',
  passcode = 'passcode',
}

type TMfaCallbackData = {
  title?: string;
  successRoute?: string | unknown;
  callback?: any;
  button?: string;
  confirmations?: EConfirmationTypes[];
};

interface IMfaState {
  shown: boolean;
  btnTitle: string;
  config?: AxiosRequestConfig<any> | null;
  data?: TMfaCallbackData;

  existsError: boolean;
  errorData: AxiosResponse | null;
}

export enum EMfaHeaders {
  otp = 'x-otp-code',
  totp = 'x-totp-code',
  passcode = 'x-pass-code',
  userId = 'x-user-id',
}

// type for record event occur time
type TMfaData = {
  otp?: string;
  totp?: string;
  passcode?: string;
  userId?: string;
};

// === mfa Store ===

export const useMfaStore = defineStore('mfa', {
  state: (): IMfaState => ({
    shown: false,
    btnTitle: '',
    config: null,

    existsError: false,
    errorData: null,
  }),

  getters: {
    enabled: (state) => state.shown,
    getBtnTitle: (state) => state.data?.button,
    getTitle: (state) => state.data?.title,
  },

  actions: {
    show(data: TMfaCallbackData) {
      this.$reset();
      this.data = data;
      this.shown = true;
    },
    hide() {
      this.shown = false;
      this.btnTitle = '';
      this.config = null;
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
    setError(data: AxiosResponse | null) {
      if (data) {
        this.existsError = true;
        this.errorData = data;
      } else {
        this.existsError = false;
        this.errorData = null;
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

        if (this.data?.callback) {
          this.data.callback();
        }
        return res;
      }
      return data;
    },
  },
});
