<template>
  <OChangeAddress
    :submit-button-title="$t('views.kyc.kyc2step.continue')"
    @continue="$emit('next')"
    @back="$emit('prev')"
  />
</template>

<script setup lang="ts">
import { OChangeAddress } from '@/components/ui';

defineEmits(['next', 'prev']);
</script>

<style scoped></style>
