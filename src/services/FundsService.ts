import { IFundsService, TCoins, TConvertData, TConvertInfo, TErrorResponse, TSuccessResponse } from '@/types/api';
import { AUTH_API_URL } from '@/constants';
import { IApiService } from '@/types/api';
import ApiService from "@/services/ApiService";


const URL = AUTH_API_URL

class FundsService implements IFundsService {
    private _apiServiceInstance: IApiService;

    private url: string;

    constructor() {
        this.url = 'funds'

        if (URL) {
            this.url = URL;
        }

        this._apiServiceInstance = ApiService
    }

    async getCoins(): Promise<TCoins | TErrorResponse> {
        const url = `coins`
        const res: TCoins | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async convertInfo(data: TConvertData): Promise<TConvertInfo | TErrorResponse> {
        const url = `${this.url}/convert-info`
        const res: TConvertInfo | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async convert(data: TConvertData): Promise<TSuccessResponse | TErrorResponse> {
        const url = `${this.url}/convert`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }
}

export default FundsService