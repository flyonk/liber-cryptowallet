<template>
  <div class="auth-page-container">
    <top-navigation>
      {{ $t('auth.restore.step5Title') }}
    </top-navigation>
    
    <base-input
      v-model="birthDate"
      type="mask"
      mask="99/99/9999"
      slot-char="DD/MM/YYYY"
      :placeholder="$t('views.auth.restore.restore5step.ddmmyyyy')"
      pattern="\d*"
    >
      {{ $t('auth.restore.step5BirthLabel') }}
    </base-input>

    <!-- TODO: make separated component -->
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="$emit('next')"
      >
        {{ $t('common.continueCta') }}
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