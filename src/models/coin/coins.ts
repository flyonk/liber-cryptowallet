import { STATIC_BASE_URL } from '@/constants';

export interface ICoin {
  name: string;
  code: string;
  imageUrl: string;
  networks: string[];
  minimalDepositValue: string;
  isPopular?: boolean;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): ICoin {
    return {
      name: input.name,
      code: input.code,
      imageUrl: _getSrcImageUrl(input.name),
      networks: input.networks,
      minimalDepositValue: input.minimal_deposit_value,
      isPopular: input.is_popular,
    };
  },
};

function _getSrcImageUrl(name: string) {
  //TODO change to real image from service
  return `${STATIC_BASE_URL}/currencies/${name.toLowerCase()}.svg`;
}
