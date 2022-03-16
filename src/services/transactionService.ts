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

export default {
  async getUserTransaction(): Promise<TTransaction[] | TErrorResponse> {
    // return await axios.get(apiService.transactions.userTransactions());
    // !temporary test data until I get an api token
    return await Promise.resolve([
      {
        id: 'string',
        txid: 'string',
        amount: '1000',
        timestamp: '1647339981', //15.03.22
        status: ETransactionStatus.Pending,
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
        amount: '1000',
        timestamp: '1647339981', //15.03.22
        status: ETransactionStatus.Finished,
        type: ETransactionType.Send,
        code: 'BTC',
        contractor: {
          phone: '+71234567890',
          email: 'test@example.com',
        },
      },
      {
        id: 'string',
        txid: 'string',
        amount: '1000',
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
