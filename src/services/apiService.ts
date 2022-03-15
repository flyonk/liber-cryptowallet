import { BASE_API_URL, API_VERSION } from '@/constants';

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
      return `${BASE_API_URL}/api/${API_VERSION}/funds/convert-info`;
    },
    convert(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/funds/convert`;
    },
    coins(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coins`;
    },
    depositInfo(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/deposit-info`;
    },
  },
  transactions: {
    requestFunds(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/request-funds`;
    },
  },
};
