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

import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';
import { TTopNavigation } from '@/components/ui';

defineEmits(['prev']);
</script>

<style lang="scss">
.auth-page-container {
  > .description {
    padding: 0 0 24px;
  }

  > .sign-button-wrapper {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }

  > .footer {
    margin-top: 1rem;

    > .footnote {
      color: $color-dark-grey;

      > .link {
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        color: $color-primary;
      }
    }
  }
}
</style>
