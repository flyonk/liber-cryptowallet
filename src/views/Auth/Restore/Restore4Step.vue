<template>
  <div class="auth-page-container">
    <top-navigation @click:left-icon="$emit('prev')">
      {{ $t('auth.restore.step4Title') }}
    </top-navigation>

    <div class="description text--body">
      {{ $t('auth.restore.step4Description') }}
    </div>

    <div class="notification-wrapper">
      <div class="description">
        <img
          src="@/assets/images/lock-icon.svg"
          alt="attention"
          class="image"
        />
      </div>
    </div>

    <div class="sign-button-wrapper">
      <base-button @click="$emit('next')">
        {{ $t('common.continueCta') }}
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseButton } from '@/components/UI';

defineEmits(['next', 'prev']);
</script>

<style lang="scss">
.notification-wrapper {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;

  > .description {
    padding: 120px 0 0;

    > .text {
      margin: 25px 0 0;
    }
  }

  > .footer {
    // margin: auto 0 0 0;
  }
}
</style>
