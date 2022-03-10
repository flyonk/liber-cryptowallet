export interface IPaymentLink {
  id: string;
  link: string;
  expire: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IPaymentLink {
    return {
      id: input.id,
      link: input.link || '',
      expire: input.expire || '',
    };
  },

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IPaymentLink): any {
    return {
      id: input.id,
      link: input.link,
      expire: input.expire,
    };
  },
};
