import { TSuccessSignIn } from './TSuccessSignIn';
import { TSuccessResponse } from './TSuccessResponse';
import { TErrorResponse } from './TErrorResponse';
export interface IAuthService {
    signIn(data: { phone: string }): Promise<TSuccessResponse | TErrorResponse>;
    signInProceed(data: { phone: string, otp: string }): Promise<TSuccessSignIn | TErrorResponse>
    logout(data: { access_token: string }): Promise<TSuccessResponse | TErrorResponse>;
    refresh(data: { access_token: string }): Promise<TSuccessSignIn | TErrorResponse>;
}