<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="$emit('prev')">
      Date of birth
    </TopNavigation>
    <div class="description text--body">
      As started on your official ID. We need 
      <br>
      your name to verify your identity.
    </div>
    <base-input
      v-model="birth"
      mask="99.99.9999"
      placeholder="dd.mm.yyyy"
      pattern="\d*"
      type="mask"
      slot-char="dd.mm.yyyy"
    />
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="$router.push({
          name: 'kyc-main'
        })"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseButton, BaseInput } from '@/components/UI';
import { ref } from 'vue-demi';

const birth = ref('');

defineEmits(['next', 'prev']);
</script>
