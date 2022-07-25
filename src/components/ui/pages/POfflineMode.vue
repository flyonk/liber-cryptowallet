<template>
  <t-top-navigation with-fixed-footer nav-with-custom-top-left>
    <template #content>
      <div class="content">
        <div class="image-wrapper">
          <img
            class="image"
            src="@/assets/images/no_internet_network.svg"
            alt="no internet"
          />
        </div>
        <div class="content-wrapper">
          <h1 class="title text--title-2 font-weight--semibold">
            {{ $t('offline.title') }}
          </h1>
          <p class="description">{{ $t('offline.description') }}</p>
        </div>
      </div>
    </template>
    <template #fixed-footer>
      <div class="footer-wrapper">
        <m-base-button class="btn" @click="checkConnection">
          <a-tripple-dots-spinner v-if="loading" />
          {{ !loading ? $t('errors.confirmTitle') : '' }}
        </m-base-button>
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useCheckOffline } from '@/helpers/composables/checkOffline';

const { loading, handleReconnect } = useCheckOffline();

import { TTopNavigation } from '..';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const ATrippleDotsSpinner = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.ATrippleDotsSpinner
  );
});

const emit = defineEmits(['online']);

function checkConnection() {
  function returnOnLine() {
    emit('online');
  }

  handleReconnect(returnOnLine);
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  margin-top: 40%;
  text-align: center;
}

.footer-wrapper {
  display: flex;

  > .btn {
    flex-grow: 100;
  }
}
</style>
