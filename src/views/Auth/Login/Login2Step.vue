<template>
  <VerifyCode
    v-bind="$attrs"
    :flow="VerifyCodeFlow.Login"
    @next="$emit('next')"
  />
</template>

<script lang="ts" setup>
import VerifyCode from '@/components/ui/organisms/auth/VerifyCode.vue';

import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';

defineEmits(['next']);
</script>

<style lang="scss">
// ...
</style>
