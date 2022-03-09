import { BASE_API_URL, API_VERSION } from '@/constants';

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
  },
  profile: {
    baseUrl(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile`;
    },
    avatar(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/profile/avatar`;
    },
  },
};
