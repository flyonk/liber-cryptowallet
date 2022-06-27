<template>
  <div
    v-if="isActive"
    class="offline-bundler text--callout font-weight--medium"
  >
    <i class="icon-warning" /> {{ $t('offline.bundleTitle') }}
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
  height: max-content;
  padding: 15px;
  font-size: 3vw;
  width: 100%;
  display: flex;
  justify-content: space-around;

  > i {
    font-size: 18px;
  }
}
</style>
