import axios from 'axios';
import apiService from '@/applications/liber/services/apiService';

import depositMapper, {
  IDepositInfo,
} from '@/applications/liber/models/funds/deposit';
import convertInfoMapper, {
  IConvertInfo,
  TConvertData,
} from '@/applications/liber/models/funds/convertInfo';
import coinMapper, { ICoin } from '@/applications/liber/models/funds/coin';

import { TSuccessResponse } from '@/types/api';
import { TRecipient } from '@/applications/liber/stores/transfer';
import { formatPhoneNumber } from '@/helpers/auth';
import withdrawInfoMapper, {
  IWithdrawalInfo,
  IWithdrawalInfoDTO,
  IWithdrawalInfoRequest,
} from '@/applications/liber/models/funds/withdrawInfo';
import withdrawMapper, {
  IWithdraw,
  IWithdrawRequest,
} from '@/applications/liber/models/funds/withdraw';

export default {
  async getCoins(): Promise<ICoin[]> {
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

  async withdrawInfo(data: IWithdrawalInfoRequest): Promise<IWithdrawalInfo> {
    const res = (await axios.post(
      apiService.funds.withdrawInfo(),
      withdrawInfoMapper.requestSerialize(data)
    )) as IWithdrawalInfoDTO;

    return withdrawInfoMapper.deserialize(res);
  },

  async withdraw(data: IWithdrawRequest): Promise<IWithdraw> {
    const response = await axios.post(
      apiService.funds.withdraw(),
      withdrawMapper.requestSerialize(data)
    );

    return response.data;
  },
};
