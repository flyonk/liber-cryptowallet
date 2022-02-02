export interface IKycService{
    kycCreateClaim():void
    kycHook():void
    kycGetClaimById():void
    kycProceedClaimById():void
    kycDeleteClaim():void
    kycAddFileById():void
    kycDeleteFileById():void
}