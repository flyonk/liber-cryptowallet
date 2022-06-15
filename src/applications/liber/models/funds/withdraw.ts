export interface IWithdrawRequest {
  code: string;
  amount: string;
  address: string;
  network: string;
}

export interface IWithdrawRequestDTO {
  currency_code: string;
  requested_amount: string;
  address: string;
  network: {
    name: string;
    meta?: string;
  };
}

export interface IWithdraw {
  message: string;
  amount: string; // with fee
}

export default {
  requestSerialize(input: IWithdrawRequest): IWithdrawRequestDTO {
    return {
      currency_code: input.code,
      requested_amount: input.amount,
      address: input.address,
      network: {
        name: input.network,
      },
    };
  },
};
