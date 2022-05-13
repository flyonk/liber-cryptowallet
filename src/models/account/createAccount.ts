export interface ICreateAccountDto {
  id: string;
  network: string;
  address: string;
  minimum_deposit: string;
  expected_arrival: string;
  expected_unlock: string;
}

export interface ICreateAccount {
  id: string;
  network: string;
  address: string;
  minimumDeposit: string;
  expectedArrival: string;
  expectedUnlock: string;
}

export default {
  deserialize(input: ICreateAccountDto): ICreateAccount {
    return {
      id: input.id,
      network: input.network,
      address: input.address,
      minimumDeposit: input.minimum_deposit,
      expectedArrival: input.expected_arrival,
      expectedUnlock: input.expected_unlock,
    };
  },
};
