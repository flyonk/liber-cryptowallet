import { TUpdateProfile } from './../types/api';
import { PROFILE_API_URL } from '@/constants';
import { TClaimFileList } from '@/types/api';
import { TSuccessResponse } from '@/types/api';
import { IApiService } from '@/types/api';
import { TErrorResponse } from '@/types/api';
import { TProfile } from '@/types/api';
import { useAccountStore } from '@/stores/account';
import { IKycService } from '@/types/api';
import { IProfileService } from '@/types/api';
import ApiService from './ApiService';

const URL = PROFILE_API_URL

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

    async updateProfile(payload: TUpdateProfile) {
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

    async kycHook(payload: any) {
        const url = `${this.url}/kyc/claim/hook`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, payload)
        return res
    }

    async kycGetClaimById(id: number) {
        const store = useAccountStore()
        const url = `${this.url}/kyc/claim/${id}?access_token=${store.token}`
        const res: TClaimFileList | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async kycProceedClaimById(id: number) {
        const store = useAccountStore()
        const url = `${this.url}/kyc/claim/${id}/proceed?access_token=${store.token}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async kycDeleteFileById(id: number, fileId: number) {
        const store = useAccountStore()
        const url = `${this.url}/kyc/claim/${id}/file/${fileId}?access_token=${store.token}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.delete(url)
        return res
    }

    async kycAddFileById(id: number, fileId: number) {
        const store = useAccountStore()
        const url = `${this.url}/kyc/claim/${id}/file/${fileId}?access_token=${store.token}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }
}

export default ProfileService