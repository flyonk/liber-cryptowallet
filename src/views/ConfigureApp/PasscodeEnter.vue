<template>
  <div class="auth-page-container">
    <top-navigation @click:left-icon="prevStep">
      Create passcode
    </top-navigation>
  </div>
  <div class="page-wrapper">

    <p class="text-default">
      Install an authenticator app on your mobile device. Recommended options:
    </p>
    
    <base-passcode
      class="login-passcode"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BasePasscode } from '@/components/UI';

function onSubmit(): void {
  // 
} 

function prevStep(): void {
  // go to previous step
}
</script>

<style lang="scss">
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}
.login-passcode {
  margin-top: 108px;
}
.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}
</style>