import { API_VERSION, BASE_API_URL } from '@/constants';

export default {
  profile: {
    baseUrl(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile`;
    },
    avatar(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile/avatar`;
    },
    close(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile/close`;
    },
    kycClaim(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile/kyc/claim`;
    },
    kycHook(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile/kyc/claim/hook`;
    },
  },
  recipients: {
    contacts(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/contacts`;
    },
    sync(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/contacts-sync`;
    },
    invite(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/invite`;
    },
    payment(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/payment-link`;
    },
  },
  funds: {
    convertInfo(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/funds/convert/info`;
    },
    convert(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/funds/convert`;
    },
    coins(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/coins`;
    },
    depositInfo(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/deposit-info`;
    },
    withdrawInfo(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/funds/withdrawal/info`;
    },
    withdraw(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/funds/withdraw`;
    },
  },
  transactions: {
    transactionsList(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/transactions`;
    },
    requestFunds(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/request-funds`;
    },
    transactionDetailsByCoin(coin: string, id: string): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/transactions/coin/${coin}/id/${id}`;
    },
  },
  transfer: {
    send(coin: string): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/transfer/coin/${coin}`;
    },
  },
};
