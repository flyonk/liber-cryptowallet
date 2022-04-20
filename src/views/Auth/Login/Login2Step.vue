<template>
  <t-top-navigation @click:left-icon="$emit('prev')">
    <template #title>{{ $t('common.codeInput') }}</template>
    <template #content>
      <VerifyCode v-bind="$attrs" :flow="VerifyCodeFlow.Login" />
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import VerifyCode from '@/components/ui/organisms/auth/VerifyCode.vue';
import TTopNavigation from '@/components/templates/TTopNavigation.vue';

import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';

defineEmits(['prev']);
</script>

<style lang="scss">
// ...
</style>
