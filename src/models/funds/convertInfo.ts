export type TConvertData = {
  list: Record<string, { fullname: string; amount?: string }>;
};

export interface IConvertInfo {
  transactionFee: string;
  guaranteedRate: string;
  amountToBeTransferred: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IConvertInfo {
    return {
      transactionFee: input.transactionFee,
      guaranteedRate: input.guaranteedRate,
      amountToBeTransferred: input.amountToBeTransferred,
    };
  },
};
