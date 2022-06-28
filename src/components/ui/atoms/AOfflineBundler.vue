<template>
  <div v-if="isActive" class="offline-bundler font-weight--medium">
    <i class="icon-attention_error" /> {{ $t('offline.bundleTitle') }}
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
  font-size: 3.1vw;
  width: 100%;
  display: flex;
  justify-content: space-around;
  line-height: 24px;

  > i {
    font-size: 24px;
  }
}
</style>
