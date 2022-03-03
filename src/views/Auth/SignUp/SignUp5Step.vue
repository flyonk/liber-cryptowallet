<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="$emit('prev')">
      {{ $t('auth.signup.step5Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step4Description1') }}
      <br>
      {{ $t('auth.signup.step4Description2') }}
    </div>
    <base-input
      v-model="birth"
      mask="99.99.9999"
      :placeholder="$t('views.auth.signup.signup5step.ddmmyyyy')"
      pattern="\d*"
      type="mask"
      slot-char="dd.mm.yyyy"
    />
    <!-- TODO: move to a separated component -->
    <div class="sign-button-wrapper">
      <BaseButton
        block
        @click="$router.push({
          name: 'kyc-main'
        })"
      >
        {{ $t('common.nextStep') }}
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
