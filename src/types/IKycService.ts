import { TErrorResponse } from './TErrorResponse';
import { TClaimCreateSuccess } from "./TClaim";

export interface IKycService {
    kycCreateClaim(payload: any): Promise<TClaimCreateSuccess | TErrorResponse>
    kycHook(): void
    kycGetClaimById(): void
    kycProceedClaimById(): void
    kycDeleteClaim(): void
    kycAddFileById(): void
    kycDeleteFileById(): void
}