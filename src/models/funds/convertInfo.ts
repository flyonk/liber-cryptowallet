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
  requestAmount?: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any, data: any): IConvertInfo {
    return {
      from: input.from,
      to: input.to,
      rate: input.rate,
      backRate: input.back_rate,
      fee: input.fee,
      validUntil: input.valid_until,
      estimatedAmount: input.estimated_amount || '100',
      requestAmount: data.request_amount || '0',
    };
  },
  deserializeBack(input: any, data: any): IConvertInfo {
    return {
      to: input.from,
      from: input.to,
      backRate: input.rate,
      rate: input.back_rate,
      fee: input.fee,
      validUntil: input.valid_until,
      estimatedAmount: data.request_amount || '100',
      requestAmount: input.estimated_amount,
    };
  },
};
