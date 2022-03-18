export interface IAccount {
  name: string;
  balance: string;
  exchange: string;
  code: string;
  baseBalanceConversion: string;
  baseBalanceConversionCode: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IAccount {
    return {
      name: input.name.toUpperCase(),
      balance: input.balance,
      exchange: input.exchange,
      code: input.code,
      baseBalanceConversion: input.base_balance || 0,
      baseBalanceConversionCode: input.base_balance_code || '€',
    };
  },
};
