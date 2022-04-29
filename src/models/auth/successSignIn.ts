export interface ISuccessSignInDto {
  access_token: string;
  refresh_token: string;
}

export interface ISuccessSignIn {
  token: string;
  refreshToken: string;
}

export default {
  deserialize(input: ISuccessSignInDto): ISuccessSignIn {
    return {
      token: input.access_token,
      refreshToken: input.refresh_token,
    };
  },
};
