import { AxiosInstance } from "axios";
import ApiService from "./ApiService";

interface IAuthService {
    signin(): void;
    logout(): void;
    refresh(): void;
}

class AuthService implements IAuthService {

    private static _instance: AuthService;
    private _apiServiceInstance: ApiService

    constructor(apiServiceInstance: ApiService) {
        // const apiServiceInstance = new ApiService()
        this._apiServiceInstance = apiServiceInstance
    }

    static getInstance(): AuthService {
        if (this._instance) {
            return this._instance
        }

        const apiServiceInstance = new ApiService()
        return new this(apiServiceInstance);
    }

    //public 
    signin(): void {
        this._apiServiceInstance.fetch({})
        throw new Error("Method not implemented.");
    }

    logout(): void {
        this._apiServiceInstance
        throw new Error("Method not implemented.");
    }

    refresh(): void {
        throw new Error("Method not implemented.");
    }
}

export default AuthService