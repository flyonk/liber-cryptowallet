import axios from 'axios';
import apiService from '@/services/apiService';

import accountMapper, { IAccount } from '@/models/account/account';

// import { TSuccessResponse } from '@/types/api';

export default {
  async getAccountBalanceByCoin(coin: string): Promise<IAccount> {
    const res = await axios.get(`${apiService.account.accountsList()}/${coin}`);
    return res.data.list.map(accountMapper.deserialize);
  },
};
