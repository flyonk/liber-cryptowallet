<template>
  <div class="auth-page-container">
    <m-top-navigation @click:left-icon="$emit('prev')">
      {{ $t('auth.restore.step4Title') }}
    </m-top-navigation>

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
      <m-base-button block @click="$emit('next')">
        {{ $t('common.continueCta') }}
      </m-base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MBaseButton, MTopNavigation } from '@liber-biz/crpw-ui-kit-liber';

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
