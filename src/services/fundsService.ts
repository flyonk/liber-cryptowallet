import axios from 'axios';
import apiService from '@/services/apiService';
import {
  TCoins,
  TConvertData,
  TConvertInfo,
  TDepositInfo,
  TErrorResponse,
  TSuccessResponse,
} from '@/types/api';

//TODO: deserialize api responses - every method should return mapped model

export default {
  async getCoins(): Promise<TCoins | TErrorResponse> {
    return await axios.get(apiService.funds.coins());
  },

  async getDepositInfo(
    coinCode: string
  ): Promise<TDepositInfo | TErrorResponse> {
    return await axios.get(`${apiService.funds.depositInfo()}/${coinCode}`);
  },

  async convertInfo(
    data: TConvertData
  ): Promise<TConvertInfo | TErrorResponse> {
    return await axios.post(apiService.funds.convertInfo(), data);
  },

  async convert(
    data: TConvertData
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.funds.convert(), data);
  },
};
