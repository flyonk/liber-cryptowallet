<template>
  <div class="auth-page-container">
    <m-top-navigation @click:left-icon="$router.push({ name: Route.Login })">
      {{ $t('auth.restore.step1Title') }}
    </m-top-navigation>
    <div class="description text--body">
      {{ $t('auth.restore.step1Description') }}
    </div>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input />
      </div>
      <div class="col-8 ml-auto">
        <m-base-input class="m-base-input" :use-grouping="false" type="number">
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
        </m-base-input>
      </div>
    </div>
    <div class="sign-button-wrapper">
      <m-base-button block @click="$emit('next')">
        {{ $t('common.continueCta') }}
      </m-base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { BaseCountryPhoneInput } from '@/components/ui';

import { Route } from '@/router/types';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
const { MBaseInput, MBaseButton, MTopNavigation } = uiKit as any;

defineEmits(['next', 'prev']);
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}
</style>
