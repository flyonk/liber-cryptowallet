<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    class="passcode-container"
    @click:left-icon="router.push({ name: Route.ChangePasscode })"
  >
    <template #title>
      {{ $t('views.passcodeEnter.newPasscode') }}
    </template>
    <template #content>
      <div class="passcode">
        <base-passcode :action-type="EPasscodeActions.update" />
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { EPasscodeActions } from '@/types/base-component';
import { Route } from '@/router/types';

import { BasePasscode, TTopNavigation } from '@/components/ui';

const router = useRouter();
</script>

<style lang="scss" scoped>
.change-passcode {
  padding: 0 16px;
}

.splash {
  & > .illustration {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .text {
      text-align: center;
    }
  }
}

.passcode {
  margin: 132px 0 0;
}
</style>
