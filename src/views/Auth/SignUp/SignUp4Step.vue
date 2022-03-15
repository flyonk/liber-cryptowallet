<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="$emit('prev')">
      {{ $t('auth.signup.step4Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step4Description1') }}
      <br />
      {{ $t('auth.signup.step4Description2') }}
    </div>
    <base-input v-model="firstname">
      <template #label>
        {{ $t('common.firstName') }}
      </template>
    </base-input>
    <base-input v-model="lastname">
      <template #label>
        {{ $t('common.lastName') }}
      </template>
    </base-input>
    <div class="sign-button-wrapper">
      <BaseButton block @click="$emit('next')">
        {{ $t('common.nextStep') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi';

import { TopNavigation, BaseButton, BaseInput } from '@/components/UI';

defineEmits(['next', 'prev']);

const firstname = ref('');
const lastname = ref('');
</script>
