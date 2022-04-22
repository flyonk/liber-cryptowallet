import { API_VERSION, BASE_API_URL } from '@/constants';

export default {
  auth: {
    signIn(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/auth`;
    },
    signInProceed(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/auth/proceed`;
    },
    refresh(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/auth/refresh`;
    },
    logout(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/auth/logout`;
    },
    devices(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/auth/devices`;
    },
  },
  profile: {
    baseUrl(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/profile`;
    },
    avatar(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/profile/avatar`;
    },
    close(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/profile/close`;
    },
    kycClaim(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/profile/kyc/claim`;
    },
    kycHook(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/profile/kyc/claim/hook`;
    },
  },
  authenticators: {
    configure(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/authenticators/configure`;
    },
    change(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/authenticators/change`;
    },
  },
  verification: {
    bySMS(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/verification-by-sms`;
    },
    byApp(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/verification-by-auth-app`;
    },
  },
  recipients: {
    contacts(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/contacts`;
    },
    sync(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/contacts-sync`;
    },
    invite(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/invite`;
    },
    payment(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/payment-link`;
    },
  },
  funds: {
    convertInfo(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/funds/convert/info`;
    },
    convert(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/funds/convert`;
    },
    coins(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/coins`;
    },
    depositInfo(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/deposit-info`;
    },
  },
  transactions: {
    transactionsList(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/transactions`;
    },
    requestFunds(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/request-funds`;
    },
    transactionDetailsByCoin(coin: string, id: string): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/transactions/coin/${coin}/id/${id}`;
    },
  },
  account: {
    accountsList(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/accounts`;
    },
    userTransactions(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/transactions`;
    },
    create(coin: string): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/accounts/${coin}/address`;
    },
  },
  transfer: {
    send(coin: string): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/transfer/coin/${coin}`;
    },
  },
  localData: {
    countryDial(): string {
      return `/country_dial_info.json`;
    },
  },
  coin: {
    getCoins(): string {
      return `${BASE_API_URL}/coin/api/${API_VERSION}/coins`;
    },
  },
  passcode: {
    global(): string {
      return `${BASE_API_URL}/auth/api/${API_VERSION}/user/passcode`;
    },
  },
};
