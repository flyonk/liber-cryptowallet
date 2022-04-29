export interface IAccountTotalDto {
  sum: string;
  currency: string;
}

export interface IAccountTotal {
  sum: string;
  currency: string;
}

export default {
  deserialize(input: IAccountTotalDto): IAccountTotal {
    return {
      sum: parseFloat(input.sum).toFixed(2),
      currency: input.currency,
    };
  },
};
