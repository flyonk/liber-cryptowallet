import axios from 'axios';
import apiService from '@/applications/liber/services/apiService';

import convertInfoMapper, {
  IConvertInfo,
  TConvertData,
} from '@/applications/liber/models/funds/convertInfo';

import { TSuccessResponse } from '@/types/api';

export default {
  async convertInfo(data: Omit<TConvertData, 'amount'>): Promise<IConvertInfo> {
    const res = await axios.post(apiService.funds.convertInfo(), data);
    return convertInfoMapper.deserialize(res.data, data);
  },

  async convert(
    data: Omit<TConvertData, 'request_amount'>
  ): Promise<TSuccessResponse> {
    return (await axios.post(apiService.funds.convert(), data)).data;
  },
};
