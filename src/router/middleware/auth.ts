import { NavigationGuardNext, RouteLocation } from 'vue-router';
import { get } from '@/helpers/storage';
import { EStorageKeys } from '@/types/storage';
import { Route } from '@/router/types';
import { useProfileStore } from '@/stores/profile';
import { useAuthStore } from '@/stores/auth';

const isAuthenticated = async (): Promise<boolean> => {
  const [token, refreshToken] = await Promise.all([
    get(EStorageKeys.token),
    get(EStorageKeys.refreshToken),
  ]);

  return !!token && !!refreshToken;
};

const onLogout = async () => {
  const profileStore = useProfileStore();
  const authStore = useAuthStore();

  authStore.setStep(0, 'login');
  await authStore.logout(profileStore.getUser.id);
};

const authGuard = async (
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
) => {
  if (to.matched.some((route) => route.meta.authRequired)) {
    if (await isAuthenticated()) {
      next();

      return;
    }

    await onLogout();

    next({ name: Route.Login });

    return;
  }
  next();
};

export default authGuard;
