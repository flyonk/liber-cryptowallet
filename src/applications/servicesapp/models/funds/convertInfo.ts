export interface IConvertInfoDto {
  from_code: string;
  to_code: string;
  rate: string;
  back_rate: string;
  fee: string;
  valid_until: string;
  estimated_amount: string;
  estimated_coupon: string;
}

export type TConvertCouponData = {
  from_code: string;
  to_code: string;
  request_amount: string;
  request_coupon: string;
};

export type TConvertData = {
  from_code: string;
  to_code: string;
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
  deserialize(input: IConvertInfoDto, data: TConvertCouponData): IConvertInfo {
    return {
      from: input.from_code,
      to: input.to_code,
      rate: input.rate,
      backRate: input.back_rate,
      fee: input.fee,
      validUntil: input.valid_until,
      estimatedAmount:
        data.from_code === input.from_code
          ? input.estimated_amount
          : data.request_amount,
      requestAmount:
        data.from_code === input.from_code
          ? data.request_amount
          : input.estimated_amount,
    };
  },
};
