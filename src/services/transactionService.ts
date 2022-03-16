import axios from 'axios';
import apiService from '@/services/apiService';

import transactionMapper, {
  INetTransaction,
} from '@/models/transaction/transaction';

// import { TSuccessResponse } from '@/types/api';

export default {
  async getTransactionList(): Promise<INetTransaction[]> {
    const res = await axios.get(apiService.transactions.transactionsList());
    return res.data.list.map(transactionMapper.deserialize);
  },
};
