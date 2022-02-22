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

  <base-toast
    v-model:visible="showErrorToast"
    severity="error"
  >
    <template #description>
      <div>
        Invalid password or phone number +7 (764) 432 32-32
      </div>
    </template>
    <template #footer>
      You do not have an account? 
      <router-link
        :to="{ name: 'sign-up' }"
        class="link"
      >
        Registration
      </router-link>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TopNavigation, BasePasscode, BaseToast } from '@/components/UI';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
const showErrorToast = ref(false)
function onSubmit(success: boolean): void {
  if (success) {
    authStore.setStep(3, 'login');
  } else {
    showErrorToast.value = true;
  }
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