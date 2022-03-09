import { AxiosError, AxiosResponse } from 'axios';

import { AUTH_API_URL } from '@/constants';
import OldApiService from '@/services/OldApiService';
import { IApiService } from '@/types/api';
import { IAuthService } from '@/types/api';
import { TErrorResponse } from '@/types/api';
import { TSuccessResponse } from '@/types/api';
import { TSuccessSignIn } from '@/types/api';

const URL = AUTH_API_URL;

class AuthService implements IAuthService {
  private _apiServiceInstance: IApiService;

  private url: string;

  constructor() {
    this.url = '';

    if (URL) {
      this.url = URL;
    }

    this._apiServiceInstance = OldApiService.getInstance();
  }

  //Public functions
  async signIn(data: { phone: string }) {
    const url = `${this.url}`;
    const res: TSuccessResponse | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }

  async signInProceed(data: { phone: string; otp: string }) {
    const url = `${this.url}/proceed`;
    const res: AxiosResponse<TSuccessSignIn | TErrorResponse> =
      await this._apiServiceInstance.fetch.post(url, data);
    // FIXME:
    return res as unknown as
      | AxiosResponse<TSuccessSignIn>
      | AxiosError<TErrorResponse>;
  }

  async logout(data: { access_token: string }) {
    const url = `${this.url}/logout`;
    const res: TSuccessResponse | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }

  async refresh(data: { refresh_token: string }) {
    const url = `${this.url}/refresh`;
    const res: TSuccessSignIn | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }
}

export default AuthService;
