<template>
  <div class="suspended-transaction">
    <t-top-navigation
      left-icon-name="icon-app-navigation-back"
      @click:left-icon="$router.go(-1)"
    >
      <template #title>
        {{ $t('auth.restore.suspendedScreenTitle') }}
      </template>
      <template #content>
        <div class="content-wrapper">
          <h1 class="description">
            {{ $t('auth.restore.suspendedScreenDescription') }}
          </h1>
          <img
            :src="`${STATIC_BASE_URL}/static/illustrations/shield.png`"
            alt="protection"
            class="image"
          />
          <div class="sign-button-wrapper">
            <m-base-button
              class="done"
              block
              size="large"
              @click="$router.go(-1)"
            >
              {{ $t('auth.restore.suspendedScreenBtn') }}
            </m-base-button>
          </div>
        </div>
      </template>
    </t-top-navigation>
  </div>
</template>

<script setup lang="ts">
import { STATIC_BASE_URL } from '@/constants';
// import { Route } from '@/router/types';
import { defineAsyncComponent } from 'vue';
import { TTopNavigation } from '@/components/ui';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});
</script>

<style lang="scss" scoped>
.suspended-transaction {
  background: $color-white;
  height: 100vh;

  > .template-top-navigation {
    height: 100%;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .description {
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    color: $color-black;
  }
}

.sign-button-wrapper {
  position: absolute;
  bottom: 24px;
  left: 16px;
  right: 16px;
}
</style>
