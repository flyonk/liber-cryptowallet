import { NavigationGuardNext, RouteLocation } from 'vue-router';

import { get } from '@/helpers/storage';
import { useAuthStore } from '@/stores/auth';

import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';
import { ISuccessSignIn } from '@/models/auth/successSignIn';

const _authenticationCredentials = async (): Promise<ISuccessSignIn | null> => {
  const [token, refreshToken] = await Promise.all([
    get(EStorageKeys.token),
    get(EStorageKeys.refreshToken),
  ]);

  return token && refreshToken ? { token, refreshToken } : null;
};

const _onLogout = async () => {
  const authStore = useAuthStore();

  authStore.setStep(0, 'login');
  await authStore.logout();
};

const _syncAuthStore = async (data: ISuccessSignIn) => {
  const authStore = useAuthStore();

  await authStore.setToken(data);
};

const authGuard = async (
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
) => {
  // Case fow swipe back and back btn in browser
  // on login passcode screen
  if (from.name === Route.Login) {
    const authStore = useAuthStore();
    const state = await authStore.getState.steps.login;
    const name = to?.name;
    // instead of loading screen will show screen with phone input for login
    if (state === 2 && name === Route.WelcomeLogoScreen) {
      authStore.setStep(0, 'login');
      next({ name: Route.Login });
      return;
    }
  }

  if (to.matched.some((route) => route.meta.authRequired)) {
    const credentials = await _authenticationCredentials();

    if (credentials) {
      await _syncAuthStore(credentials);
      next();

      return;
    }

    await _onLogout();

    next({ name: Route.Login });

    return;
  }
  next();
};

export default authGuard;
