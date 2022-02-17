import { IVerificator } from '@/types/api';
import { TVerification } from '@/types/api';
import { TConfigureAppData } from '@/types/api';
import { TUpdateProfile } from '@/types/api';
import { PROFILE_API_URL } from '@/constants';
import { TClaimFileList } from '@/types/api';
import { TSuccessResponse } from '@/types/api';
import { IApiService } from '@/types/api';
import { TErrorResponse } from '@/types/api';
import { TProfile } from '@/types/api';
import { IKycService } from '@/types/api';
import { IProfileService } from '@/types/api';
import ApiService from './ApiService';

const URL = PROFILE_API_URL

class ProfileService implements IProfileService, IKycService, IVerificator {

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
        const url = `${this.url}`
        const res: TProfile | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async updateProfile(data: TUpdateProfile) {
        const url = `${this.url}`
        const res: TProfile | TErrorResponse = await this._apiServiceInstance.fetch.patch(url, data)
        return res
    }

    async updateProfileAvatar(data: File) {
        const url = `${this.url}`
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.patch(url, data, config)
        return res
    }

    async kycCreateClaim(data: any) {
        const url = `${this.url}/kyc/claim`
        const res: TClaimFileList | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async kycHook(data: any) {
        const url = `${this.url}/kyc/claim/hook`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async kycGetClaimById(id: number) {
        const url = `${this.url}/kyc/claim/${id}`
        const res: TClaimFileList | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async kycProceedClaimById(id: number) {
        const url = `${this.url}/kyc/claim/${id}/proceed`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async kycDeleteFileById(id: number, fileId: number) {
        const url = `${this.url}/kyc/claim/${id}/file/${fileId}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.delete(url)
        return res
    }

    async kycAddFileById(id: number, fileId: number) {
        const url = `${this.url}/kyc/claim/${id}/file/${fileId}`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async closeProfile(): Promise<TSuccessResponse | TErrorResponse> {
        const url = `${this.url}/close`
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url)
        return res
    }

    async configureApp(): Promise<TConfigureAppData | TErrorResponse> {
        const url = `authenticators/configure`
        const res: TConfigureAppData | TErrorResponse = await this._apiServiceInstance.fetch.get(url)
        return res
    }

    async changeAuthenticator(data: { targetAuthenticator: string }): Promise<TSuccessResponse | TErrorResponse> {
        const url = `authenticators/change `
        const res: TSuccessResponse | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async verificationBySMS(data: { otp: string; }): Promise<TVerification | TErrorResponse> {
        const url = `verification-by-sms`
        const res: TVerification | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }

    async verificationByApp(data: { code: string; }): Promise<TVerification | TErrorResponse> {
        const url = `verification-by-auth-app`
        const res: TVerification | TErrorResponse = await this._apiServiceInstance.fetch.post(url, data)
        return res
    }
}

export default ProfileService