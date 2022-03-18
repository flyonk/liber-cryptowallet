import axios from 'axios';
import apiService from '@/services/apiService';

import transactionMapper, {
  INetTransaction,
} from '@/models/transaction/transaction';

// import { TSuccessResponse } from '@/types/api';

export default {
  async getTransactionList(coin?: string): Promise<INetTransaction[]> {
    //TODO: implement pagination
    const url = coin
      ? `${apiService.transactions.transactionsList()}/coin/${coin}`
      : apiService.transactions.transactionsList();
    const res = await axios.get(url);
    return res.data.list.map(transactionMapper.deserialize);
  },
};
