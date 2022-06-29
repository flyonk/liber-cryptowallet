import axios from 'axios';
import apiService from '@/applications/liber/services/apiService';

import transactionMapper, {
  INetTransaction,
  TTransaction,
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

  async getTransactionById(id: string): Promise<TTransaction> {
    const res = await axios.get(
      `${apiService.transactions.transactionsList()}/${id}`
    );
    return transactionMapper.deserialize(res.data) as TTransaction;
  },

  async getTransactionDetailsByCoinAndId(
    id: string,
    coin: string
  ): Promise<TTransaction> {
    const response = await axios.get(
      apiService.transactions.transactionDetailsByCoin(coin, id)
    );

    return transactionMapper.deserialize(response.data) as TTransaction;
  },
};