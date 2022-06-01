import axios from 'axios';
import apiService from '@/services/apiService';

import depositMapper, { IDepositInfo } from '@/models/funds/deposit';
import convertInfoMapper, {
  IConvertInfo,
  TConvertData,
} from '@/models/funds/convertInfo';
import coinMapper, { IFoundsCoin } from '@/models/funds/coin';
import { withdrawalInfoData } from '../../tests/mock/withdrawalData';

import { TSuccessResponse } from '@/types/api';
import { TRecipient } from '@/stores/transfer';
import { formatPhoneNumber } from '@/helpers/auth';
import withdrawInfoMapper, {
  IWithdrawalInfo,
  IWithdrawalInfoRequest,
} from '@/models/funds/withdrawInfo';

export default {
  async getCoins(): Promise<IFoundsCoin[]> {
    const res = await axios.get(apiService.funds.coins());
    return res.data.map(coinMapper.deserialize);
  },

  async getDepositInfo(coinCode: string): Promise<IDepositInfo> {
    const res = await axios.get(
      `${apiService.funds.depositInfo()}/${coinCode}`
    );
    return depositMapper.deserialize(res.data);
  },

  async convertInfo(data: Omit<TConvertData, 'amount'>): Promise<IConvertInfo> {
    const res = await axios.post(apiService.funds.convertInfo(), data);
    return convertInfoMapper.deserialize(res.data, data);
  },

  async convert(
    data: Omit<TConvertData, 'request_amount'>
  ): Promise<TSuccessResponse> {
    return (await axios.post(apiService.funds.convert(), data)).data;
  },

  async transfer(
    coin: string,
    payload: { recipient: TRecipient; amount: string }
  ): Promise<number> {
    payload.recipient.phone = formatPhoneNumber(payload.recipient.phone);

    return (await axios.post(apiService.transfer.send(coin), payload)).data;
  },

  //TODO mocked data is used. Please change to real data soon.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async withdrawInfo(data: IWithdrawalInfoRequest): Promise<IWithdrawalInfo> {
    // const res = await axios.post(
    //   apiService.funds.withdrawInfo(),
    //   withdrawInfoMapper.requestSerialize(data)
    // );

    return withdrawInfoMapper.deserialize(withdrawalInfoData);
  },
};
