import axios from 'axios';
import apiService from '@/services/apiService';

import accountMapper, { IAccount } from '@/models/account/account';
import accountBalanceMapper, {
  IAccountTotal,
} from '@/models/account/IAccountTotal';

// import { TSuccessResponse } from '@/types/api';

export default {
  async getAccounts(): Promise<IAccount[]> {
    const res = await axios.get(apiService.account.accountsList());
    return res.data.map(accountMapper.deserialize);
  },

  async getAccountBalanceByCoin(coin?: string): Promise<IAccount> {
    const res = await axios.get(`${apiService.account.accountsList()}/${coin}`);
    return accountMapper.deserialize(res.data);
  },

  async getAccountsTotalBalance(): Promise<IAccountTotal> {
    const res = await axios.get(`${apiService.account.accountsList()}/total`);
    return accountBalanceMapper.deserialize(res.data);
  },
};
