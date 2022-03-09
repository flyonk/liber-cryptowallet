<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="prevStep">
      {{ $t('configureApp.twoFATitle') }}
    </top-navigation>

    <p class="text-default">
      {{ $t('configureApp.twoFADescription') }}
    </p>

    <div class="flex-center">
      <img src="@/assets/images/2fa-keys.svg" alt="keys" />
    </div>
  </div>

  <div style="padding: 15px">
    <base-button block @click="$router.push({ name: 'install-app' })">
      {{ $t('common.continueCta') }}
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
