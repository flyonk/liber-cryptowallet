import { API_VERSION, BASE_API_URL } from '@/constants';

export default {
  checkLiberSaveEmail(): string {
    return `${BASE_API_URL}/api/${API_VERSION}/coin/liber/user/verify`;
  },
  funds: {
    convertInfo(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/liber/purchase/coupons/info`;
    },
    convert(): string {
      return `${BASE_API_URL}/api/${API_VERSION}/coin/liber/purchase/coupons`;
    },
  },
};
