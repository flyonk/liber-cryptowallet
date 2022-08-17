<template>
  <t-top-navigation left-icon-name="icon-log_out" @click:left-icon="prevStep">
    <template #title>{{ $t('auth.login.step3Title') }}</template>
    <template #content>
      <base-passcode
        :show-touch-faceid="showNativeVerification"
        class="login-passcode"
        @submit="onSubmit"
      />

      <router-link :to="{ name: Route.RestorePasscode }" class="recovery-link">
        {{ $t('auth.login.forgotYourPasscode') }}
      </router-link>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/auth';
import { use2faStore } from '@/stores/2fa';
import { useAppOptionsStore } from '@/stores/appOptions';
import { Route } from '@/router/types';
import { useErrorsStore } from '@/stores/errors';

import { BasePasscode, TTopNavigation } from '@/components/ui';
import Login3StepPasscodeErrorVue from '@/components/ui/errors/Login3StepPasscodeError.vue';

const router = useRouter();
const { t } = useI18n();

const authStore = useAuthStore();
const twoFAStore = use2faStore();
const appOptionsStore = useAppOptionsStore();
const errorsStore = useErrorsStore();

appOptionsStore.init();

const showNativeVerification = computed(() => {
  const { faceid, touchid } = appOptionsStore.getOptions;
  return faceid || touchid;
});

async function onSubmit(success: boolean): Promise<void> {
  if (success) {
    /*
     * Check 2fa auth state
     * If more than 3 days 2FA requested
     */
    const is2FAIsExpired = await twoFAStore.check2FAExpire();

    if (is2FAIsExpired) {
      await authStore.logout();
      authStore.setStep(0, 'login');
      await router.push({ name: Route.Login });
    } else {
      await router.push({
        name: Route.DashboardHome,
      });
    }
  } else {
    const errorDescription =
      t('auth.login.step3InvalidInput') + ' ' + authStore.getLoginPhone;
    errorsStore.handle({
      err: new Error('invalid passcode'),
      name: 'Login3Step',
      ctx: 'onSubmit',
      description: errorDescription,
      customErrorComponent: markRaw(Login3StepPasscodeErrorVue),
    });
  }
}

// async function deletePasscode(): Promise<void> {
//   await passcodeStore.delete();
// }

async function prevStep(): Promise<void> {
  await authStore.clearTokenData();
  authStore.setStep(0, 'login');
}
</script>

<style lang="scss">
.login-passcode {
  margin-top: 108px;

  @media (max-height: 680px) {
    margin-top: 20px;
  }
}

.page-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

.recovery-link {
  margin-top: 8vh;
  display: flex;
  justify-content: center;
  color: $color-primary-500;
  font-family: Inter, sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.0043em;

  @media (max-height: 680px) {
    margin-top: 10px;
  }
}

.recovery-link:visited {
  color: $color-primary-500;
}

.base-toast-footer {
  padding-bottom: 32px;
}
</style>
