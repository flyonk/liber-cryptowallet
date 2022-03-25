export interface ICreateAccount {
  id: string;
  network: string;
  address: string;
  minimumDeposit: string;
  expectedArrival: string;
  expectedUnlock: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): ICreateAccount {
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
