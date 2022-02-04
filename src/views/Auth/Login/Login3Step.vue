<template>
  <div class="auth-page-container">
    <top-navigation>
      Enter verification code
    </top-navigation>
    <div class="description text--body">
      Get a verification code from the authenticator app
    </div>
    <base-verification-code-input @complete="onComplete" />
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseVerificationCodeInput } from '@/components/UI';

const onComplete = (code: string) => {
  console.debug(code)
}
</script>