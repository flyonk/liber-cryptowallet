<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="prevStep">
      Setup Two Factor Authentication
    </top-navigation>

    <p class="text-default">
      Take these few steps to enable two-factor authentication and make your account more secure. 
    </p>

    <div class="flex-center">
      <img
        src="@/assets/images/2fa-keys.svg"
        alt="keys"
      >
    </div>
  </div>

  <div style="padding: 15px">
    <base-button
        block
        @click="$router.push({ name: 'install-app' })"
      >
      Continue
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/UI';

function prevStep(): void {
  // go to previous step
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  overflow: auto;

  display: flex;
  flex-direction: column;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 20px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>
