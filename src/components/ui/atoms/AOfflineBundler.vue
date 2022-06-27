<template>
  <div
    v-if="isActive"
    class="offline-bundler text--callout font-weight--medium"
  >
    {{ $t('offline.bundleTitle') }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.offline-bundler {
  color: $color-white;
  background-color: $color-red-500;
  position: absolute;
  top: 0;
  left: 0;
  height: max-content;
  padding: 15px;
  text-align: center;
  font-size: 3vw;
  width: 100%;
}
</style>
