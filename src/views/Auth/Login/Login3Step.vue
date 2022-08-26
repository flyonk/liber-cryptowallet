<template>
  <t-top-navigation left-icon-name="icon-log_out" @click:left-icon="prevStep">
    <template #title>{{ $t('auth.login.step3Title') }}</template>
  </t-top-navigation>
  <div class="content">
    <base-passcode
      :show-touch-faceid="showNativeVerification"
      class="login-passcode"
      @submit="onSubmit"
    />

    <router-link :to="{ name: Route.RestorePasscode }" class="recovery-link">
      {{ $t('auth.login.forgotYourPasscode') }}
    </router-link>
  </div>
  <m-base-toast
    :visible="sessionExpiredToast"
    @update:visible="sessionExpiredToast = false"
  >
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/attention.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description>
      {{ $t('auth.login.step3SessionExpired') }}
    </template>
    <template #footer>
      <m-base-button block size="large" @click="onLogin">
        {{ $t('common.logInCta') }}
      </m-base-button>
    </template>
  </m-base-toast>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, inject, markRaw, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/auth';
import { use2faStore } from '@/stores/2fa';
import { useAppOptionsStore } from '@/stores/appOptions';
import { Route } from '@/router/types';
import { useErrorsStore } from '@/stores/errors';

import { BasePasscode, TTopNavigation } from '@/components/ui';
import Login3StepPasscodeErrorVue from '@/components/ui/errors/Login3StepPasscodeError.vue';
import { uiKitKey } from '@/types/symbols';
import { UiKitInterface } from '@/types/uiKit';
import { STATIC_BASE_URL } from '@/constants';
import { EStorageKeys } from '@/types/storage';
import { remove } from '@/helpers/storage';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit as UiKitInterface;

const router = useRouter();
const { t } = useI18n();

const authStore = useAuthStore();
const twoFAStore = use2faStore();
const appOptionsStore = useAppOptionsStore();
const errorsStore = useErrorsStore();

const sessionExpiredToast = ref(false);

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
      sessionExpiredToast.value = true;
    } else {
      // removes unnecessary data for a new login
      await remove(EStorageKeys.signUpPhone);
      await remove(EStorageKeys.lastSessionPhone);

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

async function onLogin() {
  await authStore.logout();
  authStore.setStep(0, 'login');
  sessionExpiredToast.value = false;
  await router.push({ name: Route.Login });
}
</script>

<style lang="scss">
.content {
  flex: 1;
  display: flex;
  flex-direction: column;

  & > .login-passcode {
    margin-top: auto;
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
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  color: $color-primary-500;
  font-family: Inter, sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.0043em;
  margin-bottom: auto;
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
