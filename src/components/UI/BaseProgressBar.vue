<template>
  <div class="progress-bar-container">
    <progress-bar
      :value="value"
      :show-value="false"
      class="progress-bar"
      :style="styles"
    />
  </div>
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import { computed } from 'vue-demi';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  height: {
    type: String,
    default: '8',
  },
});

const styles = computed(() => ({
  height: `${props.height}px`,
}));
</script>

<style lang="scss" scoped>
.progress-bar-container {
  > :deep(.p-progressbar) {
    background-color: $color-primary-100;

    > .p-progressbar-value {
      background-color: $color-primary;
    }
  }
}
</style>
