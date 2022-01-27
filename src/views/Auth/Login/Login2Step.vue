<template>
  <div class="auth-page-container">
    <top-navigation @click:left-icon="prevStep">
      Enter passcode
    </top-navigation>
  </div>
  
  <base-passcode
    class="login-passcode"
    @submit="onSubmit"
  />
</template>

<script lang="ts" setup>
import { TopNavigation, BasePasscode } from '@/components/UI';

import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/ui/toast';
import { EToastSeverity } from '@/types/toast';

const authStore = useAuthStore();
const toastStore = useToastStore();

function openErrorToast (): void {
  toastStore.openToast({
    description: "<div class='text--title-3'>Invalid password or phone number +7 (764) 432 32-32</div>",
  }, EToastSeverity.error)
}

function onSubmit(passcode: string): void {
  console.debug('passcode is ', passcode)

  openErrorToast();
} 

function prevStep(): void {
  authStore.setStep(0, 'login')
}
</script>

<style lang="scss">
.login-passcode {
  margin-top: 108px;
}
</style>