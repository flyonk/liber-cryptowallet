import { TClaimFileList } from './../types/TClaim';
import { TSuccessResponse } from '../types/TSuccessResponse';
import { IApiService } from './../types/IApiService';
import { TErrorResponse } from './../types/TErrorResponse';
import { TProfile } from './../types/TProfile';
import { useAccountStore } from './../stores/account';
import { IKycService } from './../types/IKycService';
import { IProfileService } from './../types/IProfileService';
import ApiService from './ApiService';

const URL = process.env.VUE_APP_PROFILE_URL

class ProfileService implements IProfileService, IKycService {

    private _apiServiceInstance: IApiService;

    private url: string;

    constructor() {
        this.url = ''

        if (URL) {
            this.url = URL;
        }

        this._apiServiceInstance = ApiService
    }

    async getProfile() {
        const store = useAccountStore()
        const url = `${this.url}?access_token=${store.token}`
        const res: TProfile | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async updateProfile(payload: TProfile) {
        const store = useAccountStore()
        const url = `${this.url}?access_token=${store.token}`
        const res: TProfile | TErrorResponse = await this._apiServiceInstance.fetch.patch(url, payload)
        return res
    }

    async updateProfileAvatar(payload: File) {
        const store = useAccountStore()
        const url = `${this.url}?access_token=${store.token}`
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.patch(url, payload, config)
        return res
    }

    async kycCreateClaim(payload: any) {
        const store = useAccountStore()
        const url = `${this.url}/kyc/claim?access_token=${store.token}` 
        const res: TClaimFileList | TErrorResponse = await this._apiServiceInstance.fetch.post(url, payload)
        return res
    }
    
    kycHook(): void {
        throw new Error('Method not implemented.');
    }
    
    async kycGetClaimById(id: number) {
        const store = useAccountStore()
        const url = `${this.url}/kyc/claim/${id}?access_token=${store.token}` 
        const res: TClaimFileList | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    kycProceedClaimById(): void {
        throw new Error('Method not implemented.');
    }

    kycDeleteClaim(): void {
        throw new Error('Method not implemented.');
    }

    kycAddFileById(): void {
        throw new Error('Method not implemented.');
    }

    kycDeleteFileById(): void {
        throw new Error('Method not implemented.');
    }
}

export default ProfileService