export interface IAuthService {
    url: string;
    signIn(data: { phone: string }): void;
    signInProceed(data: { phone: string, otp: string }): void
    logout(data: { access_token: string }): void;
    refresh(data: { access_token: string }): void;
}