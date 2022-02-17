import { IRequestFundsService, TErrorResponse, TRequestFundsPaymentLink, TStatement, TSuccessResponse, TCreateRequestFundsData } from '@/types/api';
import { AUTH_API_URL } from '@/constants';
import { IApiService } from '@/types/api';
import ApiService from "./ApiService";

const URL = AUTH_API_URL

class RequestFundsService implements IRequestFundsService {
    private _apiServiceInstance: IApiService;

    private url: string;

    constructor() {
        this.url = 'request-funds'

        if (URL) {
            this.url = URL;
        }

        this._apiServiceInstance = ApiService
    }

    async downloadStatement(id: string): Promise<TStatement | TErrorResponse> {
        const url = `${this.url}/${id}/statement`
        const res: TStatement | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async getPaymentLink(id: string): Promise<TRequestFundsPaymentLink | TErrorResponse> {
        const url = `${this.url}/${id}`
        const res: TRequestFundsPaymentLink | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async cancelRequestFunds(id: string): Promise<TSuccessResponse | TErrorResponse> {
        const url = `${this.url}/${id}/cancel`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async sendRequestedFunds(id: string): Promise<TSuccessResponse | TErrorResponse> {
        const url = `${this.url}/${id}/send`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async declineRequestedFunds(id: string): Promise<TSuccessResponse | TErrorResponse> {
        const url = `${this.url}/${id}/decline`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async createRequestFunds(id: string, data: TCreateRequestFundsData): Promise<TSuccessResponse | TErrorResponse> {
        const url = `${this.url}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }
}

export default RequestFundsService