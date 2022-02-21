<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: '2fa-app' })">
      Don’t miss a beat
    </top-navigation>

    <div class="page-content">
      <img
        src="@/assets/images/pushnotification-icon.svg"
        alt="Puch notifications"
        class="mb-3"
      >
      <p class="text-default">
        Get notified about spending, security, wealth, market movements,
        discounts and deals, so you’re always in the know
      </p>
    </div>
  </div>
  <div style="padding: 15px">
    <base-button
      block
      class="mb-3"
      @click="onEnable"
    >
      Enable push notifications
    </base-button>
    <base-button
      block
      view="secondary"
      @click="onCancel"
    >
      Not now
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/UI'

const onEnable = (): void => {
  // enable push notifications
}

const onCancel = (): void => {
  // do not enable push notifications
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-default {
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;
  height: 48px;
  width: 100%;
}

.page-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
</style>
