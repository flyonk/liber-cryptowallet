<template>
  <div v-if="mfaVisible">
    <h1>Hello world</h1>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMfaStore } from '@/stores/mfa';

const mfaStore = useMfaStore();

const mfaVisible = computed(() => {
  return mfaStore.enabled;
});
</script>

<style lang="scss" scoped></style>
