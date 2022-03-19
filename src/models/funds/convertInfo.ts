export type TConvertData = {
  from: string;
  to: string;
  request_amount: string;
  amount: string;
};

export interface IConvertInfo {
  from: string;
  to: string;
  rate: string;
  backRate: string;
  fee: string;
  validUntil: string;
  estimatedAmount: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IConvertInfo {
    return {
      from: input.from,
      to: input.to,
      rate: input.rate,
      backRate: input.back_rate,
      fee: input.fee,
      validUntil: input.valid_until,
      estimatedAmount: input.estimated_amount || '100',
    };
  },
};
