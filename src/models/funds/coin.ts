export interface IFoundsCoinDto {
  code: string;
  fullname: string;
  suggested: boolean;
}

export interface IFoundsCoin {
  code: string;
  fullname: string;
  suggested: boolean;
}

export default {
  deserialize(input: IFoundsCoinDto): IFoundsCoin {
    return {
      code: input.code,
      fullname: input.fullname,
      suggested: input.suggested,
    };
  },
};
