export interface ICoin {
  name: string;
  code: string;
  imageUrl: string;
  networks: string[];
  minimalDepositValue: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): ICoin {
    return {
      name: input.name,
      code: input.code,
      imageUrl: input.image_url,
      networks: input.networks,
      minimalDepositValue: input.minimal_deposit_value,
    };
  },
};
