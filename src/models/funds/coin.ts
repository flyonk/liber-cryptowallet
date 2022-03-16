export interface ICoin {
  code: string;
  fullname: string;
  suggested: boolean;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): ICoin {
    return {
      code: input.code,
      fullname: input.fullname,
      suggested: input.suggested,
    };
  },
};