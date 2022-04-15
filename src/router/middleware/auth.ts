import { NavigationGuardNext, RouteLocation } from 'vue-router';

import { get } from '@/helpers/storage';
import { useProfileStore } from '@/stores/profile';
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
  const profileStore = useProfileStore();
  const authStore = useAuthStore();

  authStore.setStep(0, 'login');
  await authStore.logout(profileStore.getUser.id);
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
