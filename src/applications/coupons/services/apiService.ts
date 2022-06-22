import { API_VERSION, BASE_API_URL } from '@/constants';

export default {
  accounts: {
    totalBalance(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coupon/accounts/total`;
    },
    allAccounts(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coupon/accounts`;
    },
  },

  transactions: {
    allTransactions(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coupon/transactions`;
    },
  },
};
