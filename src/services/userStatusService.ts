import { useAuthStore } from '@/stores/auth';

import { Route } from '@/router/types';
import { EKYCStatus, EUserStatus, IProfile } from '@/models/profile/profile';
import { AuthFlow } from '@/models/auth/flow';

export async function getKYCStatus(): Promise<void> {
  //This is stub method to retrieve user status
}

export function getAuthRoute(user: IProfile): AuthFlow {
  const authStore = useAuthStore();
  switch (user.status) {
    case EUserStatus.authenticated:
      authStore.setStep(2, 'registration');
      return {
        route: Route.SignUp,
        step: 2,
      };
    case EUserStatus.registered:
      // if (user.kycStatus === EKYCStatus.success)
      //   if (user.is2FAConfigured) {
      //     authStore.setStep(2, 'login');
      //     return { route: Route.Login, step: 2 };
      //   } else {
      //     return { route: Route.ConfigureApp };
      //   }
      if (user.kycStatus > EKYCStatus.not_started) {
        return { route: Route.SignUp };
      } else {
        return { route: Route.KYCMain };
      }

    default:
      return { route: Route.WelcomeLogoScreen };
  }
}
