import { TProfile } from './../types/TProfile';
import { useAccountStore } from './../stores/account';
import { IKycService } from './../types/IKycService';
import { IProfileService } from './../types/IProfileService';
import ApiService from './ApiService';
import { AxiosPromise } from 'axios';

const URL = process.env.VUE_APP_PROFILE_URL

class ProfileService implements IProfileService, IKycService {

    private _apiServiceInstance: typeof ApiService | undefined;

    private url: string;

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

    async getProfile(): Promise<AxiosPromise<TProfile> | undefined> {
        const store = useAccountStore()
        const url = `${this.url}?access_token=${store.token}`

        const profile = await this._apiServiceInstance?.fetch.get(url)

        return profile ? profile : undefined
    }
    updateProfile(): void {
        throw new Error('Method not implemented.');
    }
    updateProfileAvatar(): void {
        throw new Error('Method not implemented.');
    }
    kycCreateClaim(): void {
        throw new Error('Method not implemented.');
    }
    kycHook(): void {
        throw new Error('Method not implemented.');
    }
    kycGetClaimById(): void {
        throw new Error('Method not implemented.');
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