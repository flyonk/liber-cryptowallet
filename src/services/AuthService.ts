import { IApiService } from './../types/IApiService';
import ApiService from "./ApiService";
import { IAuthService } from "@/types/IAuthService";
import { TSuccessResponse } from "@/types/TSuccessResponse";
import { TErrorResponse } from "@/types/TErrorResponse";
import { TSuccessSignIn } from '@/types/TSuccessSignIn';

const URL = process.env.VUE_APP_AUTH_URL

class AuthService implements IAuthService {
    private _apiServiceInstance: IApiService;

    private url: string;

    constructor() {
        this.url = ''

        if (URL) {
            this.url = URL;
        }

        this._apiServiceInstance = ApiService
    }

    //Public functions
    async signIn(data: { phone: string }) {
        const url = `${this.url}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async signInProceed(data: { phone: string, otp: string }) {
        const url = `${this.url}`
        const res: TSuccessSignIn | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async logout(data: { access_token: string }) {
        const url = `${this.url}/logout`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async refresh(data: { access_token: string }) {
        const url = `${this.url}/refresh`
        const res: TSuccessSignIn | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }
}

export default AuthService