import axios from 'axios';
import apiService from '@/services/apiService';

import signInMapper, { ISuccessSignIn } from '@/models/auth/successSignIn';
import { TSuccessResponse } from '@/types/api';
import { IUserDevice } from '@/models/auth/devices';
import { formatPhoneNumber } from '@/helpers/auth';

export default {
  async signIn(data: { phone: string }): Promise<TSuccessResponse> {
    data.phone = formatPhoneNumber(data.phone);

    return (await axios.post(apiService.auth.signIn(), data)).data;
  },

  async signInProceed(data: {
    phone: string;
    otp: string;
    code_2fa: string;
  }): Promise<ISuccessSignIn> {
    data.phone = formatPhoneNumber(data.phone);

    const res = await axios.post(apiService.auth.signInProceed(), data);
    return signInMapper.deserialize(res.data);
  },

  async logout(data: { user_id: string }): Promise<TSuccessResponse> {
    return (await axios.post(apiService.auth.logout(), data)).data;
  },

  async refresh(data: { refresh_token: string }): Promise<ISuccessSignIn> {
    const res = await axios.post(apiService.auth.refresh(), data);
    return signInMapper.deserialize(res.data);
  },

  async devices(): Promise<IUserDevice[]> {
    // const res = await axios.get(apiService.auth.devices());

    // return res.data.map(DevicesMapper.deserialize);

    return mockData;
  },
};

const mockData: IUserDevice[] = [
  {
    id: '1',
    agentType: 'ios',
    deviceName: 'iPhone XR',
    loggedAt: '1542674993',
    ip: '45.234.12.154',
    location: 'Pavshino Russian Federation',
  },
  {
    id: '2',
    agentType: 'mac',
    deviceName: 'Chrome V96.0.4664.93 (Mac OS)',
    loggedAt: '1542674993',
    ip: '45.234.12.154',
    location: 'Tallin Estonia',
  },
  {
    id: '3',
    agentType: 'ios',
    deviceName: 'iPhone XR',
    loggedAt: '1542674993',
    ip: '45.234.12.154',
    location: 'Tbilisi Georgia',
  },
];
