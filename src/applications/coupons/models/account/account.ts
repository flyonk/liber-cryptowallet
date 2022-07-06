import { STATIC_BASE_URL } from '@/constants';

export interface ICouponAccountDto {
  name: string;
  code: string;
  balance: string;
  base_balance: string;
  base_balance_code: string;
  id: number;
}

export interface ICouponAccount {
  name: string;
  balance: string;
  code: string;
  baseBalanceConversion: string;
  baseBalanceConversionCode: string;
  imageUrl: string;
}

export default {
  deserialize(input: ICouponAccountDto): ICouponAccount {
    return {
      name: input.name,
      balance: input.balance,
      code: input.code,
      baseBalanceConversion: input.base_balance || '0',
      baseBalanceConversionCode: input.base_balance_code,
      imageUrl: `${STATIC_BASE_URL}/static/currencies/coupons/${input.code}.svg`,
    };
  },
};
