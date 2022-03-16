import axios from 'axios';
import apiService from '@/services/apiService';

import SignInMapper, { ISuccessSignIn } from '@/models/auth/successSignIn';
import { TSuccessResponse } from '@/types/api';
import DevicesMapper, { IUserDevice } from '@/models/auth/devices';

export default {
  async signIn(data: { phone: string }): Promise<TSuccessResponse> {
    return (await axios.post(apiService.auth.signIn(), data)).data;
  },

  async signInProceed(data: {
    phone: string;
    otp: string;
  }): Promise<ISuccessSignIn> {
    const res = await axios.post(apiService.auth.signInProceed(), data);
    return SignInMapper.deserialize(res.data);
  },

  async logout(data: { access_token: string }): Promise<TSuccessResponse> {
    return (await axios.post(apiService.auth.logout(), data)).data;
  },

  async refresh(data: { refresh_token: string }): Promise<ISuccessSignIn> {
    const res = await axios.post(apiService.auth.refresh(), data);
    return SignInMapper.deserialize(res.data);
  },

  async devices(): Promise<IUserDevice[]> {
    const res = await axios.get(apiService.auth.devices());

    return DevicesMapper.deserialize(res.data);
  },
};
