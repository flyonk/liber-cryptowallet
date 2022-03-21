<template>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasePasscode, BaseToast, TopNavigation } from '@/components/ui';
import { useAuthStore } from '@/stores/auth';
import { Route } from '@/router/types';

const authStore = useAuthStore();
const showErrorToast = ref(false);

function onSubmit(success: boolean): void {
  if (success) {
    authStore.setStep(3, 'login');
  } else {
    showErrorToast.value = true;
  }
}
function prevStep(): void {
  authStore.setStep(1, 'login');
}
</script>

<style lang="scss">
.login-passcode {
  margin-top: 108px;
}
</style>
