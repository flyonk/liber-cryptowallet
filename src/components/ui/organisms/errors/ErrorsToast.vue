<template>
  <m-base-toast
    v-if="displayCurrent"
    :visible="displayCurrent"
    @update:visible="hideErrorMsg"
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
        <p v-if="displayMultipleErrorMessage" class="description">
          {{ $t('errors.severalErrorsOccuredPleaseTryAgainLater') }}
        </p>
        <p v-else class="description">
          {{ getErrorMessage() }}
        </p>
      </div>
    </template>
    <template v-if="displayMultipleErrorMessage" #footer>
      <div class="popup-footer">
        <m-base-button class="btn mb-3" size="large" @click="resetErrors">
          {{ $t('errors.gotIt') }}
        </m-base-button>
        <m-base-button class="btn mb-3" size="large" @click="showErrorsDetails">
          {{ $t('errors.details') }}
        </m-base-button>
      </div>
    </template>
    <template v-else #footer>
      <div class="popup-footer">
        <template v-if="hasCustomComponent">
          <component :is="customComponent" />
        </template>
        <template v-else-if="isSingleError || displayAllErrors">
          <m-base-button class="btn mb-3" size="large" @click="hideErrorMsg">
            {{ $t('errors.gotIt') }}
          </m-base-button>
        </template>
      </div>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useErrorsStore } from '@/stores/errors';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit!;

const errorsStore = useErrorsStore();
const mode = ref<'DISPLAY_ALL_ERRORS' | null>(null);

function hideErrorMsg(): void {
  errorsStore.hideCurrent();
  if (errorsStore.isSingleError) {
    mode.value = null;
  }
}

function resetErrors(): void {
  errorsStore.$reset();
}

function showErrorsDetails(): void {
  mode.value = 'DISPLAY_ALL_ERRORS';
}

function getErrorMessage(): string {
  return errorsStore.getErrorMessage();
}

const displayAllErrors = computed(() => {
  return mode.value === 'DISPLAY_ALL_ERRORS';
});

const displayCurrent = computed(() => errorsStore.displayCurrent);
const toastImg = computed(() =>
  errorsStore.severity ? 'sapphire-error' : 'sapphire-error'
);
const isSingleError = computed(() => errorsStore.isSingleError);
const customComponent = computed(() => errorsStore.getCustomComponent);
const hasCustomComponent = computed(() => !!errorsStore.getCustomComponent);
const displayMultipleErrorMessage = computed(
  () => errorsStore.isMultipleErrors && !displayAllErrors.value
);
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
</style>
