<template>
  <base-toast
    v-if="true"
    :visible="true"
    severity="attention"
    @update:visible="hideErrorMsg"
  >
    <template #description>
      <p class="heading-black-lg">
        {{ $t('errors.numberAlreadyInUse') }}
      </p>
      <p class="phone-in-use-error-description">
        {{
          $t('errors.numberInUseDetail', {
            numberPhone: '',
          })
        }}
      </p>
    </template>
    <template #footer>
      <div class="popup-footer">
        <base-button class="btn mb-3" size="large" @click="goToLogin">
          {{ $t('auth.signup.welcomeAuth.loginWithThisNumber') }}
        </base-button>
        <base-button
          class="btn mb-3"
          size="large"
          view="secondary"
          @click="goBack"
        >
          {{ $t('auth.signup.welcomeAuth.goBack') }}
        </base-button>
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { BaseButton, BaseToast } from '@/components/ui';

// TODO: need to format phone number through mask to show it in toast
// const props = defineProps({
//   phone: {
//     type: String,
//     required: true,
//   },
// });
const emits = defineEmits(['next', 'close']);

const goToLogin = () => {
  emits('next');
};

const goBack = () => {
  emits('close');
};
</script>

<style lang="scss" scoped>
.popup-footer {
  display: flex;
  flex-direction: column;
}

.phone-in-use-error-description {
  margin-top: 8px;
}
</style>
