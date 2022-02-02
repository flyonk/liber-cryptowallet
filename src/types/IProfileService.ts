import { TSuccessResponse } from './TSuccessResponse';
import { TErrorResponse } from './TErrorResponse';
import { TProfile } from './TProfile';

export interface IProfileService {
    getProfile(): Promise<TProfile | TErrorResponse>;
    updateProfile(payload: TProfile): Promise<TProfile | TErrorResponse>;
    updateProfileAvatar(file: File): Promise<TSuccessResponse | TErrorResponse>;
}