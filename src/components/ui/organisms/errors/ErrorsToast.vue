<template>
  <m-base-toast
    v-if="displayCurrent"
    :visible="displayCurrent"
    :severity="severity"
    @update:visible="hideErrorMsg"
  >
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
import { computed, defineAsyncComponent, ref } from 'vue';
import { useErrorsStore } from '@/stores/errors';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const MBaseToast = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseToast
  );
});

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
const severity = computed(() => errorsStore.severity);
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
</style>
