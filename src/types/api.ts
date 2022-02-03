import { AxiosInstance } from "axios";

export interface IApiService {
    baseURL: string;
    fetch: AxiosInstance;
}

export interface IAuthService {
    signIn(data: { phone: string }): Promise<TSuccessResponse | TErrorResponse>;
    signInProceed(data: { phone: string, otp: string }): Promise<TSuccessSignIn | TErrorResponse>
    logout(data: { access_token: string }): Promise<TSuccessResponse | TErrorResponse>;
    refresh(data: { access_token: string }): Promise<TSuccessSignIn | TErrorResponse>;
}

export interface IKycService {
    kycCreateClaim(payload: any): Promise<TClaimFileList | TErrorResponse>
    kycHook(): void
    kycGetClaimById(id: number): Promise<TClaimFileList | TErrorResponse>
    kycProceedClaimById(id: number): Promise<TSuccessResponse | TErrorResponse>
    kycDeleteFileById(id: number, fileId: number): Promise<TSuccessResponse | TErrorResponse>
    kycAddFileById(id: number, fileId: number): Promise<TSuccessResponse | TErrorResponse>
}

export interface IProfileService {
    getProfile(): Promise<TProfile | TErrorResponse>;
    updateProfile(payload: TProfile): Promise<TProfile | TErrorResponse>;
    updateProfileAvatar(file: File): Promise<TSuccessResponse | TErrorResponse>;
}

export type TProfile = {
    "status": number,
    "phone": string,
    "is_verified": false,
    "block_reason": string,
    "created_at": string,
    "updated_at": string,
    "deleted_at": string,
    "first_name": string,
    "last_name": string,
    "email": string,
    "country": string,
    "street_and_number": string,
    "optional_address": string,
    "postal_code": string,
    "birthdate": string
}

export type TClaim = {
    "id": number,
    "claim_id": number,
    "type": number,
    "name": string,
    "extension": string,
    "link": string,
    "created_at": string,
    "updated_at": string,
    "deleted_at": string
}

export type TClaimFileList = {
    "file_list": TClaim[],
    "user_id": string,
    "id": number,
    "status": number,
    "created_at": string,
    "updated_at": string,
    "deleted_at": string
}

export type TErrorResponse = {
    "message": string,
    "code": number,
    "details": {
        "key": string
    }
}

export type TSuccessResponse = {
    message: string
}

export type TSuccessSignIn = {
    "access_token": string,
    "refresh_token": string
}