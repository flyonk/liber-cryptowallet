import ApiService from "./ApiService";
import { IAuthService } from "@/types/IAuthService";

const URL = process.env.VUE_APP_AUTH_URL

class AuthService implements IAuthService {
    private _apiServiceInstance: typeof ApiService | undefined;

    url: string;

    constructor() {
        this.url = ''

        if (URL) {
            this.url = URL;
        }

        if (!ApiService) {
            this._apiServiceInstance = undefined
            return
        }

        this._apiServiceInstance = ApiService
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