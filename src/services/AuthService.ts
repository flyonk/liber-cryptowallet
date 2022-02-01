// import { AxiosInstance } from "axios";
import ApiService from "./ApiService";

const URL = process.env.VUE_APP_AUTH_URL

interface IAuthService {
    url: string;
    signIn(data: { phone: string }): void;
    signInProceed(data: { phone: string, otp: string }): void
    logout(data: { access_token: string }): void;
    refresh(data: { access_token: string }): void;
}

class AuthService implements IAuthService {
    private static _instance: AuthService;
    private _apiServiceInstance: ApiService | undefined;

    url: string;

    private constructor() {
        if (URL) {
            this.url = URL;
        }

        this.url = ''

        if (!ApiService.getInstance()) {
            this._apiServiceInstance = undefined
            return
        }

        this._apiServiceInstance = ApiService.getInstance()
    }

    static getInstance(): AuthService {
        return this._instance || (this._instance = new this());
    }

    //Public functions
    signIn(data: { phone: string }): void {
        const target = `${this.url}`
        this._apiServiceInstance?.fetch.post(target, data)
    }

    signInProceed(data: { phone: string, otp: string }): void {
        const target = `${this.url}`
        this._apiServiceInstance?.fetch.post(target, data)
    }

    logout(data: { access_token: string }): void {
        const target = `${this.url}/logout`
        this._apiServiceInstance?.fetch.post(target, data)
    }

    refresh(data: { access_token: string }): void {
        const target = `${this.url}/refresh`
        this._apiServiceInstance?.fetch.post(target, data)
    }
}

export default AuthService