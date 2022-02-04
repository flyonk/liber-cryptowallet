<template>
  <div class="auth-page-container">
    <top-navigation>
      Your previous number
    </top-navigation>
    <div class="description text--body">
      The phone number you last logged in with.
    </div>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input />
      </div>
      <div class="col-8 ml-auto">
        <base-input
          :use-grouping="false"
          type="number"
        >
          <template #label>
            Number
          </template>  
        </base-input>
      </div>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="$emit('next')"
      >
        Continue
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseCountryPhoneInput, BaseInput, BaseButton } from '@/components/UI';

defineEmits(['next', 'prev'])
</script>