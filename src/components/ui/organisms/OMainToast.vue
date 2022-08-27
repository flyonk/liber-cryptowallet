<template>
  <m-base-toast
    :visible="isToastExists"
    content-style="border-radius:32px;"
    @update:visible="deleteToast"
  >
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/${toastImg}.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description>
      <div class="popup-description">
        <p class="title text--title-3">{{ currentToast.title }}</p>
        <p class="description text--body">
          {{ currentToast.description }}
        </p>
      </div>
    </template>
    <template #content-footer>
      <div class="popup-footer">
        <template v-if="!!currentToast.additionalContent">
          <component :is="currentToast.additionalContent" />
        </template>
        <template v-else-if="showCloseButton">
          <m-base-button class="btn mb-3" size="large" @click="deleteToast">
            {{ $t('errors.gotIt') }}
          </m-base-button>
        </template>
      </div>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';

import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';
import { UiKitInterface } from '@/types/uiKit';
import { useUIStore } from '@/stores/ui';
import { EToastSeverity } from '@/types/toast';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit as UiKitInterface;

const uiStore = useUIStore();

const isToastExists = computed(() => !!uiStore.getToasts.length);

const currentToast = computed(() => uiStore.getToasts[0]);

const showCloseButton = computed(
  () => currentToast.value.severity === EToastSeverity.error
);

const toastImg = computed(() => {
  const toastImageMapper = {
    warning: 'attention',
    error: 'sapphire-error',
    success: 'confirmation',
  };

  return toastImageMapper[currentToast.value.severity];
});

const deleteToast = () => {
  uiStore.deleteToast();
};
</script>

<style lang="scss" scoped>
.popup-footer {
  display: flex;
  justify-content: space-around;
}

.popup-image {
  display: flex;
  justify-content: center;
  width: 100%;

  > .image {
    width: 50px;
    height: 50px;
  }
}

.popup-description {
  > .title {
    margin: 0 0 4px;
  }
}
</style>
