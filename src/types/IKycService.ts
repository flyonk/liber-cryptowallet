import { TSuccessResponse } from '@/types/TSuccessResponse';
import { TErrorResponse } from './TErrorResponse';
import { TClaimFileList } from "./TClaim";

export interface IKycService {
    kycCreateClaim(payload: any): Promise<TClaimFileList | TErrorResponse>
    kycHook(): void
    kycGetClaimById(id: number): Promise<TClaimFileList | TErrorResponse>
    kycProceedClaimById(id: number): Promise<TSuccessResponse | TErrorResponse>
    kycDeleteFileById(id:number, fileId:number): Promise<TSuccessResponse | TErrorResponse>
    kycAddFileById(id:number, fileId:number): Promise<TSuccessResponse | TErrorResponse>
}