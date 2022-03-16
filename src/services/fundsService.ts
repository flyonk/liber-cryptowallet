import axios from 'axios';
import apiService from '@/services/apiService';

import depositMapper, { IDepositInfo } from '@/models/funds/deposit';
import convertInfoMapper, {
  IConvertInfo,
  TConvertData,
} from '@/models/funds/convertInfo';
import CoinMapper, { ICoin } from '@/models/funds/coin';

import { TSuccessResponse } from '@/types/api';

export default {
  async getCoins(): Promise<ICoin[]> {
    const res = await axios.get(apiService.funds.coins());
    return res.data.map(CoinMapper.deserialize);
  },

  async getDepositInfo(coinCode: string): Promise<IDepositInfo> {
    const res = await axios.get(
      `${apiService.funds.depositInfo()}/${coinCode}`
    );
    return depositMapper.deserialize(res.data);
  },

  async convertInfo(data: TConvertData): Promise<IConvertInfo> {
    //TODO: discuss with backend TConvertData
    const res = await axios.post(apiService.funds.convertInfo(), data);
    return convertInfoMapper.deserialize(res.data);
  },

  async convert(data: TConvertData): Promise<TSuccessResponse> {
    return (await axios.post(apiService.funds.convert(), data)).data;
  },
};
