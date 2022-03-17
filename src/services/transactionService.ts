import {
  ETransactionStatus,
  ETransactionType,
  TTransaction,
} from '@/models/transaction/transaction';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import apiService from '@/services/apiService';
import { TErrorResponse } from '@/types/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import transaction from '@/models/transaction/transaction';

export default {
  async getUserTransaction(): Promise<TTransaction[] | TErrorResponse> {
    // const res = await axios.get(apiService.transactions.userTransactions());
    // return res.data.list.map((e: any): TTransaction => {
    //   return transaction.deserialize(e);
    // });

    // !temporary test data until transaction model is updated
    return await Promise.resolve([
      {
        id: 'string',
        txid: 'string',
        amount: '0.001',
        timestamp: '1647339981', //15.03.22
        status: ETransactionStatus.Finished,
        type: ETransactionType.Deposit,
        code: 'BTC',
        contractor: {
          phone: '+71234567890',
          email: 'test@example.com',
        },
      },
      {
        id: 'string',
        txid: 'string',
        amount: '0.9',
        timestamp: '1647339981', //15.03.22
        status: ETransactionStatus.Finished,
        type: ETransactionType.Send,
        code: 'ETH',
        contractor: {
          phone: '+71234567890',
          email: 'test@example.com',
        },
      },
      {
        id: 'string',
        txid: 'string',
        amount: '1',
        timestamp: '1647339981', //15.03.22
        status: ETransactionStatus.Finished,
        type: ETransactionType.Received,
        code: 'ETH',
        contractor: {
          phone: '+71234567890',
          email: 'test@example.com',
        },
      },
    ]);
  },
};
