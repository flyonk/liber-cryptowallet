import { STATIC_BASE_URL } from '@/constants';

export interface IAccountDto {
  name: string;
  balance: string;
  exchange: string;
  code: string;
  base_balance: string;
  base_balance_code: string;
}

export interface IAccount {
  name: string;
  balance: string;
  exchange: string;
  code: string;
  baseBalanceConversion: string;
  baseBalanceConversionCode: string;
  imageUrl: string;
}

export default {
  deserialize(input: IAccountDto): IAccount {
    return {
      name: input.name,
      balance: input.balance,
      exchange: input.exchange,
      code: input.code,
      baseBalanceConversion: input.base_balance || '0',
      baseBalanceConversionCode: input.base_balance_code || '€',
      imageUrl: `${STATIC_BASE_URL}/currencies/${input.code.substring(1)}.svg`, //TODO: hack for testnet
    };
  },
};
