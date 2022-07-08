import axios from 'axios';
import apiService from '@/applications/servicesapp/services/apiService';

import convertInfoMapper, {
  IConvertInfo,
  TConvertData,
  TConvertCouponData,
} from '@/applications/servicesapp/models/funds/convertInfo';

import { TSuccessResponse } from '@/types/api';

export default {
  async convertInfo(data: TConvertCouponData): Promise<IConvertInfo> {
    const res = await axios.post(apiService.funds.convertInfo(), data);
    return convertInfoMapper.deserialize(res.data, data);
  },

  async convert(data: TConvertData): Promise<TSuccessResponse> {
    return (await axios.post(apiService.funds.convert(), data)).data;
  },
};
