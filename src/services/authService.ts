import axios, { AxiosError, AxiosResponse } from 'axios';
import apiService from '@/services/apiService';

import { TErrorResponse, TSuccessResponse, TSuccessSignIn } from '@/types/api';

//TODO: deserialize api responses - every method should return mapped model

export default {
  async signIn(data: {
    phone: string;
  }): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.auth.signIn(), data);
  },

  async signInProceed(data: {
    phone: string;
    otp: string;
  }): Promise<AxiosResponse<TSuccessSignIn> | AxiosError<TErrorResponse>> {
    return await axios.post(apiService.auth.signInProceed(), data);
  },

  async logout(data: {
    access_token: string;
  }): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.auth.logout(), data);
  },

  async refresh(data: {
    refresh_token: string;
  }): Promise<TSuccessSignIn | TErrorResponse> {
    return await axios.post(apiService.auth.refresh(), data);
  },
};
