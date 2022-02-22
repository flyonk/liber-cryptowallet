<template>
  <div class="auth-page-container">
    <top-navigation>
      When were you born?
    </top-navigation>
    
    <base-input
      v-model="birthDate"
      type="mask"
      mask="99/99/9999"
      slot-char="DD/MM/YYYY"
      placeholder="DD/MM/YYYY"
      pattern="\d*"
    >
      Date of birth
    </base-input>

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
import { ref } from 'vue';
import { TopNavigation, BaseInput, BaseButton } from '@/components/UI';

defineEmits(['next', 'prev']);

const birthDate = ref('');
</script>