import axios from 'axios';

import couponsApiService from './apiService';
import couponAccountsMapper, {
  ICouponAccount,
} from '@/applications/coupons/models/account/account';
import couponTransactionMapper from '@/applications/coupons/models/transaction/transactionListItem';
import { COUPON_ACCOUNTS } from '../../../../tests/mock/couponAccounts';
import { TTransaction } from '@/models/transaction/transaction';
import { COUPON_TRANSACTIONS } from '../../../../tests/mock/couponTransactions';

export default {
  async fetchTotalBalance() {
    const res = await axios.get(couponsApiService.accounts.totalBalance());

    return res.data;
  },

  async fetchAccounts(): Promise<ICouponAccount[]> {
    //TODO when api is ready uncomment this block of code
    // const res = await axios.get(couponsApiService.accounts.allAccounts());
    //
    // return res.data.map(couponAccountsMapper.deserialize);

    return COUPON_ACCOUNTS.map(couponAccountsMapper.deserialize);
  },

  async fetchTransactions(): Promise<TTransaction[]> {
    //TODO when api is ready uncomment this block of code
    // const res = await axios.get(
    //   couponsApiService.transactions.allTransactions()
    // );
    //
    // return res.data.map(couponTransactionMapper.deserialize);

    return COUPON_TRANSACTIONS.map(
      couponTransactionMapper.deserialize
    ) as TTransaction[];
  },
};
