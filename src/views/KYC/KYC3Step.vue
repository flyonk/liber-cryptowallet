<template>
  <div class="kyc-3-step">
    <top-navigation
      class="navigation"
      left-icon-name="ci-close_big"
    >
      <template #top-right>
        <span class="controller text--headline">
          Not now
        </span>
      </template>
      
      Proof of Identity
    </top-navigation>
    <base-progress-bar class="mb-3" />
    <p class="description">
      Your document photo helps us prove your identity. It should match the information you have provided in the previous steps.
    </p>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseProgressBar } from '@/components/UI';

</script>

<style scoped lang="scss">
.kyc-3-step {
  > .navigation {
    .controller {
      color: $color-primary;
      user-select: none;
    }
  }
}
</style>