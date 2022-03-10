import axios from 'axios';
import apiService from '@/services/apiService';

import { TErrorResponse, TSuccessResponse } from '@/types/api';
import dataMapper, { ISuccessSignIn } from '@/models/auth/successSignIn';

export default {
  async signIn(data: {
    phone: string;
  }): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.auth.signIn(), data);
  },

  async signInProceed(data: {
    phone: string;
    otp: string;
  }): Promise<ISuccessSignIn> {
    const res = await axios.post(apiService.auth.signInProceed(), data);
    return dataMapper.deserialize(res);
  },

  async logout(data: {
    access_token: string;
  }): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.auth.logout(), data);
  },

  async refresh(data: { refresh_token: string }): Promise<ISuccessSignIn> {
    const res = await axios.post(apiService.auth.refresh(), data);
    return dataMapper.deserialize(res);
  },
};
