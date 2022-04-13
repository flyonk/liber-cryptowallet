<template>
  <VerifyCode v-bind="$attrs" :flow="VerifyCodeFlow.Login" />
</template>

<script lang="ts" setup>
import VerifyCode from '@/components/ui/organisms/auth/VerifyCode.vue';

import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';
</script>

<style lang="scss">
// ...
</style>
