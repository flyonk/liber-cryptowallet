import axios from 'axios';
import apiService from '@/services/apiService';

import DepositMapper, { IDepositInfo } from '@/models/funds/deposit';
import ConvertInfoMapper, {
  IConvertInfo,
  TConvertData,
} from '@/models/funds/convertInfo';

import { TCoins, TSuccessResponse } from '@/types/api';

export default {
  //TODO: clarify this type with nested objects
  async getCoins(): Promise<TCoins> {
    return await axios.get(apiService.funds.coins());
  },

  async getDepositInfo(coinCode: string): Promise<IDepositInfo> {
    const res = await axios.get(
      `${apiService.funds.depositInfo()}/${coinCode}`
    );
    return DepositMapper.deserialize(res.data);
  },

  async convertInfo(data: TConvertData): Promise<IConvertInfo> {
    const res = await axios.post(apiService.funds.convertInfo(), data);
    return ConvertInfoMapper.deserialize(res.data);
  },

  async convert(data: TConvertData): Promise<TSuccessResponse> {
    return (await axios.post(apiService.funds.convert(), data)).data;
  },
};
