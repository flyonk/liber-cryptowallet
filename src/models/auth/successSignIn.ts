export interface ISuccessSignIn {
  token: string;
  refreshToken: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): ISuccessSignIn {
    return {
      token: input.access_token,
      refreshToken: input.refresh_token,
    };
  },
};
