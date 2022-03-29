import axios from 'axios';
import apiService from '@/services/apiService';

import accountMapper, { IAccount } from '@/models/account/account';
import accountBalanceMapper, {
  IAccountTotal,
} from '@/models/account/IAccountTotal';
import createAccount, { ICreateAccount } from '@/models/account/createAccount';

// import { TSuccessResponse } from '@/types/api';

export default {
  async getAccounts(): Promise<IAccount[]> {
    const res = await axios.get(apiService.account.accountsList());
    return res.data.map(accountMapper.deserialize);
  },

  async getAccountBalanceByCoin(coin?: string): Promise<IAccount> {
    console.log('111111');
    const res = await axios.get(`${apiService.account.accountsList()}/${coin}`);
    return accountMapper.deserialize(res.data);
  },

  async getAccountsTotalBalance(): Promise<IAccountTotal> {
    const res = await axios.get(`${apiService.account.accountsList()}/total`);
    return accountBalanceMapper.deserialize(res.data);
  },

  async createAccount(
    coin: string,
    data: { network: string; force: boolean }
  ): Promise<ICreateAccount> {
    const res = await axios.post(`${apiService.account.create(coin)}`, data);

    return createAccount.deserialize(res.data);
  },
};
