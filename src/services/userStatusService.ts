// import { useAuthStore } from '@/stores/auth';

import { Route } from '@/router/types';
import { EKYCStatus, EUserStatus, IProfile } from '@/models/profile/profile';

export async function getKYCStatus(): Promise<void> {
  //This is stub method to retrieve user status
}

//TODO: check possible user statuses
export function getAuthRoute(user: IProfile): string {
  // const authStore = useAuthStore();
  switch (user.status) {
    // case EUserStatus.authenticated:
    //   authStore.setStep(2, 'registration');
    //   return Route.SignUp;
    case EUserStatus.registered:
      if (user.kycStatus > EKYCStatus.not_started) {
        return Route.Survey;
      } else {
        return Route.KYCMain;
      }

    default:
      return Route.WelcomeLogoScreen;
  }
}
