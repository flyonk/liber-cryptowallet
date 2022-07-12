<template>
  <OChangeAddress
    :submit-button-title="$t('views.kyc.kyc2step.continue')"
    @back="$router.back()"
    @continue="$router.back()"
  />
</template>

<script lang="ts" setup>
import { OChangeAddress } from '@/components/ui';
</script>

<style lang="scss" scoped></style>
