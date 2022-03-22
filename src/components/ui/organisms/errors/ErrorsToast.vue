<template>
  <base-toast
    v-if="displayCurrent"
    :visible="displayCurrent"
    severity="error"
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
    <template #footer>
      <div class="popup-footer">
        <template v-if="isSingleError || displayAllErrors">
          <base-button class="btn mb-3" size="large" @click="hideErrorMsg">
            {{ $t('errors.gotIt') }}
          </base-button>
        </template>
        <template v-else-if="displayMultipleErrorMessage">
          <base-button class="btn mb-3" size="large" @click="resetErrors">
            {{ $t('errors.gotIt') }}
          </base-button>
          <base-button class="btn mb-3" size="large" @click="showErrorsDetails">
            {{ $t('errors.details') }}
          </base-button>
        </template>
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useErrorsStore } from '@/stores/errors';
import { BaseToast, BaseButton } from '@/components/ui';

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
const isSingleError = computed(() => errorsStore.isSingleError);
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
