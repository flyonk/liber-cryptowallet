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
  requestAmount: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any, data: any, dir: 'from' | 'to'): IConvertInfo {
    console.log('from and to', data.request_amount, input.estimated_amount);
    return {
      from: dir === 'from' ? input.from : input.to,
      to: dir === 'from' ? input.to : input.from,
      rate: dir === 'from' ? input.rate : input.back_rate,
      backRate: dir === 'from' ? input.back_rate : input.rate,
      fee: input.fee,
      validUntil: input.valid_until,
      estimatedAmount:
        dir === 'from' ? input.estimated_amount : data.request_amount,
      requestAmount:
        dir === 'from' ? data.request_amount : input.estimated_amount,
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
};
