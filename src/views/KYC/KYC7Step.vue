<template>
  <div>
    <top-navigation left-icon-name="ci-close_big"
      >We’re verifying your ID</top-navigation
    >
    <p class="description">
      Your identity is being verified. We will email and sms to you once your
      verification has completed.
    </p>
    <base-progress-circular :percent="percent" :size="267">
      <span class="percent-slot">
        <span class="text">{{ percent }}</span>
        <span class="text--large-title">%</span>
      </span>
    </base-progress-circular>
    <div class="footer">
      <base-button
        @click="
          $router.push({
            name: 'survey',
          })
        "
        >Continue</base-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  BaseProgressCircular,
  TopNavigation,
  BaseButton,
} from '@/components/UI';

const percent = ref(50);
</script>

<style scoped lang="scss">
.percent-slot {
  > .text {
    font-weight: 700;
    font-size: 72px;
    line-height: 87.14px;
  }
}
</style>
