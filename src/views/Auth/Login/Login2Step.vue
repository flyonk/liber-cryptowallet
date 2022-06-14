<template>
  <verify-code
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
