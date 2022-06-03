<template>
  <t-top-navigation left-icon-name="icon-log_out" @click:left-icon="prevStep">
    <template #title>{{ $t('auth.login.step3Title') }}</template>
    <template #content>
      <div v-if="!show2FA">
        <base-passcode
          :show-touch-faceid="showNativeVerification"
          class="login-passcode"
          @submit="onSubmit"
        />
      </div>
      <div v-else>
        <auth2-f-a-verification-component
          @close="onClose"
          @success-verification="handleSuccessVerification"
        />
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, markRaw, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/auth';
import { use2faStore } from '@/stores/2fa';
import { useAppOptionsStore } from '@/stores/appOptions';
import { usePasscodeStore } from '@/stores/passcode';
import { Route } from '@/router/types';
import { useErrorsStore } from '@/stores/errors';

import { BasePasscode, TTopNavigation } from '@/components/ui';
import Auth2FAVerificationComponent from '@/components/ui/organisms/2fa/Auth2FAVerificationComponent.vue';
import Login3StepPasscodeErrorVue from '@/components/ui/errors/Login3StepPasscodeError.vue';

const router = useRouter();
const { t } = useI18n();

const passcodeStore = usePasscodeStore();
const authStore = useAuthStore();
const twoFAStore = use2faStore();
const appOptionsStore = useAppOptionsStore();
const errorsStore = useErrorsStore();

const show2FA = ref(false);

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
      show2FA.value = true;
    } else {
      await router.push({
        name: Route.DashboardHome,
      });
    }
  } else {
    const errorDescription =
      t('auth.login.step3InvalidInput') + ' ' + authStore.getLoginPhone;
    errorsStore.handle(
      new Error('test'),
      'Login3Step',
      'onSubmit',
      errorDescription,
      markRaw(Login3StepPasscodeErrorVue)
    );
  }
}

async function deletePasscode(): Promise<void> {
  await passcodeStore.delete();
}

async function prevStep(): Promise<void> {
  if (show2FA.value) {
    authStore.setStep(1, 'login');
  } else {
    await deletePasscode();

    await authStore.clearTokenData();
    authStore.setStep(0, 'login');
  }
}

function onClose() {
  show2FA.value = false;
}

async function handleSuccessVerification(): Promise<void> {
  /*
   * Set new 2fa dateTime
   */
  twoFAStore.set2FADate();
  router.push({
    name: Route.DashboardHome,
  });
}
</script>

<style lang="scss">
.login-passcode {
  margin-top: 108px;
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

.base-toast-footer {
  padding-bottom: 32px;
}
</style>
