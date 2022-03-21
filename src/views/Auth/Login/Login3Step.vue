<template>
  <div v-if="!show2FA">
    <div class="auth-page-container">
      <top-navigation @click:left-icon="prevStep">
        {{ $t('auth.login.step3Title') }}
      </top-navigation>
    </div>

    <base-passcode class="login-passcode" @submit="onSubmit" />

    <base-toast v-model:visible="showErrorToast" severity="error">
      <template #description>
        <div>
          {{
            $t('views.auth.login.login3step.6966', {
              '1': $t('auth.login.step3InvalidInput'),
            })
          }}
        </div>
      </template>
      <template #footer>
        {{ $t('auth.login.step3FooterTitle') }}
        <router-link :to="{ name: Route.SignUp }" class="link">
          {{ $t('auth.login.step3FooterCta') }}
        </router-link>
      </template>
    </base-toast>
  </div>
  <div v-if="show2FA">
    <auth2-f-a-verification-component
      @success-verification="handleSuccessVerification"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { use2faStore } from '@/stores/2fa';

import { BasePasscode, BaseToast, TopNavigation } from '@/components/ui';
import Auth2FAVerificationComponent from '@/components/ui/organisms/2fa/Auth2FAVerificationComponent.vue';

import { Route } from '@/router/types';

const router = useRouter();

const authStore = useAuthStore();
const twoFAStore = use2faStore();
const showErrorToast = ref(false);
const show2FA = ref(false);

async function onSubmit(success: boolean): Promise<void> {
  if (success) {
    /*
     * Check 2fa auth state
     * If more than 3 days 2FA requested
     */
    (await twoFAStore.check2FAExpire())
      ? (show2FA.value = true)
      : authStore.setStep(3, 'login');
  } else {
    showErrorToast.value = true;
  }
}
function prevStep(): void {
  authStore.setStep(1, 'login');
}

function onClose() {
  show2FA.value = false;
}

function handleSuccessVerification(): void {
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
</style>
