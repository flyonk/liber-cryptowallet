import {
  IApiService,
  IFundsService,
  TCoins,
  TConvertData,
  TConvertInfo,
  TDepositInfo,
  TErrorResponse,
  TSuccessResponse,
} from '@/types/api';
import { AUTH_API_URL } from '@/constants';
import OldApiService from '@/services/OldApiService';

const URL = AUTH_API_URL;

class FundsService implements IFundsService {
  private _apiServiceInstance: IApiService;

  private url: string;

  constructor() {
    this.url = 'funds';

    if (URL) {
      this.url = URL;
    }

    this._apiServiceInstance = OldApiService.getInstance();
  }

  async getCoins(): Promise<TCoins | TErrorResponse> {
    const url = `coins`;
    const res: TCoins | TErrorResponse =
      await this._apiServiceInstance.fetch.get(url);
    return res;
  }

  async getDepositInfo(
    coinCode: string
  ): Promise<TDepositInfo | TErrorResponse> {
    const url = `deposit-info/${coinCode}`;
    const res: TDepositInfo | TErrorResponse =
      await this._apiServiceInstance.fetch.get(url);
    return res;
  }

  async convertInfo(
    data: TConvertData
  ): Promise<TConvertInfo | TErrorResponse> {
    const url = `${this.url}/convert-info`;
    const res: TConvertInfo | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }

  async convert(
    data: TConvertData
  ): Promise<TSuccessResponse | TErrorResponse> {
    const url = `${this.url}/convert`;
    const res: TSuccessResponse | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }
}

export default FundsService;
