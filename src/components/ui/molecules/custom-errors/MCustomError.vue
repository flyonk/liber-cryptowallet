<template>
  <base-toast
    v-if="!customContent"
    :visible="displayCurrent"
    :severity="severity"
  >
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
        <base-button
          :class="{ 'full-width': !error.cancelTitle }"
          class="btn"
          @click="error.confirmCallback"
        >
          {{ $t(`errors.${error.confirmTitle}`) }}
        </base-button>
        <base-button
          v-if="error.cancelTitle"
          class="btn"
          @click="error.cancelCallback"
        >
          {{ $t(`errors.${error.cancelTitle}`) }}
        </base-button>
      </div>
    </template>
  </base-toast>
  <div v-else>
    <!--TODO: implement custom content toast-->
    <component :is="customContent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useErrorsStore } from '@/stores/errors';
import { BaseButton, BaseToast } from '@/components/ui';

const errorsStore = useErrorsStore();

const displayCurrent = computed(() => errorsStore.customError?.display);
const severity = computed(() => errorsStore.customError?.severity);
const error = computed(() => errorsStore.customError);
const customContent = computed(
  () => errorsStore.customError?.customErrorComponent
);
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
