export type TConvertData = {
  from: string;
  to: string;
  request_amount: string;
  amount: string;
  request_coin?: string;
};

export interface IConvertInfo {
  from: string;
  to: string;
  rate: string;
  backRate: string;
  fee: string;
  validUntil: string;
  estimatedAmount: string;
  requestAmount: string;
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
      estimatedAmount:
        data.request_coin === input.from
          ? input.estimated_amount
          : data.request_amount,
      requestAmount:
        data.request_coin === input.from
          ? data.request_amount
          : input.estimated_amount,
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
};
