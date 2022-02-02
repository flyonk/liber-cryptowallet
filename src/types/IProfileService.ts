import { AxiosPromise } from 'axios';
import { TProfile } from './TProfile';
export interface IProfileService {
    getProfile(): Promise<AxiosPromise<TProfile> | undefined>;
    updateProfile(): void;
    updateProfileAvatar(): void;
}