export interface IAvatar {
  url: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IAvatar {
    return {
      url: input.avatar || '',
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IAvatar): any {
    return {
      avatar: input.url,
    };
  },
};
