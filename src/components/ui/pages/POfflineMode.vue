<template>
  <t-top-navigation with-fixed-footer nav-with-custom-top-left>
    <template #content>
      <div class="content">
        <div class="image-wrapper">
          <img
            class="image"
            src="@/assets/images/no-internet.svg"
            alt="no internet"
          />
        </div>
        <div class="content-wrapper">
          <h1 class="title text--title-1 font-weight--semibold">
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
import { inject } from 'vue';
import { useCheckOffline } from '@/helpers/composables/checkOffline';

import { uiKitKey } from '@/types/symbols';
import { TTopNavigation } from '..';

const { loading, handleReconnect } = useCheckOffline();

const uiKit = inject(uiKitKey);
const { ATrippleDotsSpinner, MBaseButton } = uiKit!;

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
  margin-top: 15%;
  text-align: center;
  margin-bottom: 15%;
}

.footer-wrapper {
  display: flex;
  margin-bottom: 15%;

  > .btn {
    flex-grow: 100;
  }
}
</style>
