import { TErrorResponse } from './TErrorResponse';
import { TClaim, TClaimFileList } from "./TClaim";

export interface IKycService {
    kycCreateClaim(payload: any): Promise<TClaimFileList | TErrorResponse>
    kycHook(): void
    kycGetClaimById(id: number): Promise<TClaimFileList | TErrorResponse>
    kycProceedClaimById(): void
    kycDeleteClaim(): void
    kycAddFileById(): void
    kycDeleteFileById(): void
}