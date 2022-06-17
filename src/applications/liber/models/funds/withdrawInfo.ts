export interface IWithdrawalInfoRequest {
  code: string;
  amount: string;
  network: string;
  address: string;
}

export interface IWithdrawalInfoRequestDTO {
  currency_code: string;
  requested_amount: string;
  network: {
    name: string;
  };
  address: string;
}

export interface IWithdrawalInfoDTO {
  currency_code: string;
  requested_amount: string;
  amount_to_receive: string;
  available_sum: string;
  min_request: string;
  max_request: string;
  fee: string;
  address: string;
}

export interface IWithdrawalInfo {
  currencyCode: string;
  requestAmount: string;
  amountToReceive: string;
  availableSum: string;
  minRequest: string;
  maxRequest: string;
  fee: string;
  address: string;
}

export default {
  deserialize(input: IWithdrawalInfoDTO): IWithdrawalInfo {
    return {
      currencyCode: input.currency_code,
      requestAmount: input.requested_amount,
      amountToReceive: input.amount_to_receive,
      availableSum: input.available_sum,
      minRequest: input.min_request,
      maxRequest: input.max_request,
      fee: input.fee,
      address: input.address,
    };
  },

  requestSerialize(request: IWithdrawalInfoRequest): IWithdrawalInfoRequestDTO {
    return {
      currency_code: request.code,
      requested_amount: request.amount,
      network: {
        name: request.network,
      },
      address: request.address,
    };
  },
};
