export interface IAvatar {
  link: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IAvatar {
    return {
      link: input.link || '',
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IAvatar): any {
    return {
      link: input.link,
    };
  },
};
