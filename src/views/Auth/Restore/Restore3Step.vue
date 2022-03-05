<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="prevStep"
      >Enter the 6-digit code</TopNavigation
    >
    <div class="description text--body">
      Get a verification code from the authenticator app
    </div>
    <div>
      <BaseVerificationCodeInput
        :loading="false"
        class="input"
        @complete="onComplete"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SignUp',
};
</script>

<script lang="ts" setup>
import { BaseVerificationCodeInput, TopNavigation } from '@/components/UI';

const emit = defineEmits(['next', 'prev']);

// const number = ref(null) as Ref<number | null>;
function prevStep(): void {
  emit('prev');
}

function nextStep(): void {
  emit('next');
}

function onComplete(): void {
  nextStep();
}
</script>

<style lang="scss"></style>
