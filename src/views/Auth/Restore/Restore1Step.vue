<template>
  <div class="auth-page-container">
    <top-navigation>
      {{ $t('auth.restore.step1Title') }}
    </top-navigation>
    <div class="description text--body">
      {{ $t('auth.restore.step1Description') }}
    </div>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input />
      </div>
      <div class="col-8 ml-auto">
        <base-input :use-grouping="false" type="number">
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
        </base-input>
      </div>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton block @click="$emit('next')">
        {{ $t('common.continueCta') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TopNavigation,
  BaseCountryPhoneInput,
  BaseInput,
  BaseButton,
} from '@/components/UI';

defineEmits(['next', 'prev']);
</script>
