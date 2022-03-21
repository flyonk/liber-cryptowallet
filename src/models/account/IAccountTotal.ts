export interface IAccountTotal {
  sum: string;
  currency: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IAccountTotal {
    return {
      sum: input.sum,
      currency: input.currency,
    };
  },
};
