export interface IAvatarDto {
  avatar?: string;
}

export interface IAvatar {
  url: string;
}

export default {
  deserialize(input: IAvatarDto): IAvatar {
    return {
      url: input.avatar || '',
    };
  },
  requestSerialize(input: IAvatar): IAvatarDto {
    return {
      avatar: input.url,
    };
  },
};
