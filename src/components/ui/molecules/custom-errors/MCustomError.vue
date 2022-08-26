<template>
  <template v-if="!customContent">
    <m-base-toast :visible="displayCurrent">
      <template #image>
        <div class="popup-image">
          <img :src="toastImgUrl" class="image" alt="error" />
        </div>
      </template>
      <template #header>
        <div>
          <h3>{{ $t(`errors.${error.title}`) }}</h3>
        </div>
      </template>
      <template #description>
        <div class="popup-description">
          <p class="description">
            {{ $t(`errors.${error.description}`) }}
          </p>
        </div>
      </template>
      <template #footer>
        <div class="popup-footer">
          <m-base-button
            :class="{ 'full-width': !error.cancelTitle }"
            class="btn"
            @click="handleConfirm"
          >
            <a-tripple-dots-spinner v-if="loading" />
            {{ !loading ? $t(`errors.${error.confirmTitle}`) : '' }}
          </m-base-button>
          <m-base-button
            v-if="error.cancelTitle"
            class="btn"
            @click="error.cancelCallback"
          >
            {{ $t(`errors.${error.cancelTitle}`) }}
          </m-base-button>
        </div>
      </template>
    </m-base-toast>
  </template>
  <template v-else>
    <!--TODO: implement custom content toast-->
    <component :is="customContent" />
  </template>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useErrorsStore } from '@/stores/errors';
import { useCheckOffline } from '@/helpers/composables/checkOffline';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { ATrippleDotsSpinner, MBaseButton, MBaseToast } = uiKit!;

const { loading, handleReconnect } = useCheckOffline();

const errorsStore = useErrorsStore();

const displayCurrent = computed(() => errorsStore.customError?.display);
const toastImgUrl = computed(() =>
  errorsStore.customError?.severity === 'offline'
    ? require('@/assets/images/no-wifi.svg')
    : `${STATIC_BASE_URL}/static/media/sapphire-error.svg`
);

const error = computed(() => errorsStore.customError);
const customContent = computed(
  () => errorsStore.customError?.customErrorComponent
);

function handleConfirm() {
  if (error.value) handleReconnect(error.value.confirmCallback);
}
</script>

<style lang="scss" scoped>
.popup-footer {
  display: flex;
  justify-content: space-around;

  > .full-width {
    flex-grow: 100;
  }
}
</style>
