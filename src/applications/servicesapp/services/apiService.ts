import { API_VERSION, BASE_API_URL } from '@/constants';

export default {
  checkLiberSaveEmail(): string {
    return `${BASE_API_URL}/api/${API_VERSION}/liber/user/verify`;
  },
};
