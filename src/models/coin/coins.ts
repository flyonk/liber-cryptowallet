import { STATIC_BASE_URL } from '@/constants';

export interface ICoinDto {
  name: string;
  code: string;
  networks?: string[];
  minimal_deposit_value?: string;
  is_popular?: boolean;
}

export interface ICoin {
  name: string;
  code: string;
  imageUrl?: string;
  networks?: string[];
  minimalDepositValue?: string;
  isPopular?: boolean;
}

export default {
  deserialize(input: ICoinDto): ICoin {
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
  return `${STATIC_BASE_URL}/static/currencies/${name.toLowerCase()}.svg`;
}
