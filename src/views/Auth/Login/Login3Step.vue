<template>
  <div class="auth-page-container">
    <top-navigation> Enter verification code </top-navigation>
    <div class="description text--body">
      Get a verification code from the authenticator app
    </div>
    <base-verification-code-input @complete="handleCompleteCode($event)" />
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseVerificationCodeInput } from '@/components/UI';
import AuthService from '@/services/AuthService';
import { IAuthService } from '@/types/api';
import { onMounted } from 'vue';
const authService: IAuthService = new AuthService();

onMounted(async () => {
  const phone = '+7 777 777 77 77';
  await authService.signIn({ phone });
});

const handleCompleteCode = (code: string) => {
  console.log(code);
};
</script>