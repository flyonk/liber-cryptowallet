export interface IConvertInfoDto {
  from: string;
  to: string;
  rate: string;
  back_rate: string;
  fee: string;
  valid_until: string;
  estimated_amount: string;
}

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
  deserialize(
    input: IConvertInfoDto,
    data: Omit<TConvertData, 'amount'>
  ): IConvertInfo {
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
};
