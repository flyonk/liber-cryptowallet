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
  localData: {
    countryDial(): string {
      return `/country_dial_info.json`;
    },
  },
  account: {
    accountsList(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/accounts`;
    },
    create(coin: string): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/accounts/${coin}/address`;
    },
  },
  passcode: {
    global(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/user/passcode`;
    },
  },
};
