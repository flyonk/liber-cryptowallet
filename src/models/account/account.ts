export interface IAccount {
  name: string;
  balance: string;
  exchange: string;
  code: string;
  baseBalanceConversion: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IAccount {
    return {
      name: input.name,
      balance: input.balance,
      exchange: input.exchange,
      code: input.code,
      baseBalanceConversion: input.base_balance_conversion || 0,
    };
  },
};
