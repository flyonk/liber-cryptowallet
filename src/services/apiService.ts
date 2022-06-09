import { API_VERSION, BASE_API_URL } from '@/constants';

export default {
  auth: {
    signIn(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/auth`;
    },
    signInProceed(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/auth/proceed`;
    },
    refresh(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/auth/refresh`;
    },
    logout(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/auth/logout`;
    },
    devices(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/auth/devices`;
    },
  },
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
  authenticators: {
    disable(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/user/2fa/disable`;
    },
    enable(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/user/2fa/enable`;
    },
    secret(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/user/2fa/secret`;
    },
    verify(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/user/2fa/verify`;
    },
  },
  verification: {
    bySMS(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/verification-by-sms`;
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
  account: {
    accountsList(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/accounts`;
    },
    userTransactions(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/transactions`;
    },
    create(coin: string): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/accounts/${coin}/address`;
    },
  },
  transfer: {
    send(coin: string): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/transfer/coin/${coin}`;
    },
  },
  localData: {
    countryDial(): string {
      return `/country_dial_info.json`;
    },
  },
  passcode: {
    global(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/user/passcode`;
    },
  },
};
