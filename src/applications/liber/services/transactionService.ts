import axios from 'axios';
import apiService from '@/applications/liber/services/apiService';

import transactionMapper, {
  INetTransaction,
  TTransaction,
} from '@/models/transaction/transaction';
import { COUPON_TRANSACTION_EXAMPLE } from '../../../../tests/mock/couponTransactions';

// import { TSuccessResponse } from '@/types/api';

export default {
  async getTransactionList(coin?: string): Promise<INetTransaction[]> {
    //TODO: implement pagination
    const url = coin
      ? `${apiService.transactions.transactionsList()}/coin/${coin}`
      : apiService.transactions.transactionsList();
    const res = await axios.get(url);

    //here is mock data of coupons are added
    const realDataWithMocks = [...COUPON_TRANSACTION_EXAMPLE, ...res.data.list];

    return realDataWithMocks.map(
      transactionMapper.deserialize
    ) as INetTransaction[];
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
    //here is mock data of coupon transaction is added
    if (id === 'coupon-transaction-id') {
      return transactionMapper.deserialize(
        COUPON_TRANSACTION_EXAMPLE[0]
      ) as TTransaction;
    }

    const response = await axios.get(
      apiService.transactions.transactionDetailsByCoin(coin, id)
    );

    return transactionMapper.deserialize(response.data) as TTransaction;
  },
};
