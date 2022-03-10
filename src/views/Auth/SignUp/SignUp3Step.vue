<template>
  <div class="auth-page-container">
    <top-navigation class="header" @click:left-icon="prevStep">
      {{ $t('auth.signup.step3Title') }}
    </top-navigation>
    <base-input v-model="email">
      <template #label> {{ $t('common.email') }} </template>
    </base-input>
    <base-switch v-model="sendNews" class="switch">
      {{ $t('auth.signup.step3SendNews') }}
    </base-switch>
    <div class="sign-button-wrapper">
      <base-button @click="nextStep"> {{ $t('common.nextStep') }} </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TopNavigation,
  BaseInput,
  BaseSwitch,
  BaseButton,
} from '@/components/UI';
import { useAuthStore } from '@/stores/auth';

import { ref } from 'vue-demi';

const emit = defineEmits(['prev', 'next']);
const authStore = useAuthStore();

const sendNews = ref(false);

const email = ref('');

const prevStep = () => {
  emit('prev');
};

const nextStep = () => {
  authStore.registration.email = email.value;
  emit('next');
};
</script>

<style lang="scss" scoped>
.header-nav {
  margin-bottom: 24px;
}

.switch-base {
  margin-top: 25px;
}
</style>
