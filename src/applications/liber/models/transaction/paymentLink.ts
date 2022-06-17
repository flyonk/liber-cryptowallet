export interface IPaymentLinkDto {
  id: string;
  link?: string;
  expire?: string;
}

export interface IPaymentLink {
  id: string;
  link: string;
  expire: string;
}

export default {
  deserialize(input: IPaymentLinkDto): IPaymentLink {
    return {
      id: input.id,
      link: input.link || '',
      expire: input.expire || '',
    };
  },

  requestSerialize(input: IPaymentLink): IPaymentLinkDto {
    return {
      id: input.id,
      link: input.link,
      expire: input.expire,
    };
  },
};
