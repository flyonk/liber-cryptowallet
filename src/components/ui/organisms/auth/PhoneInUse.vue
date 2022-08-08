<template>
  <m-base-toast v-if="true" :visible="true" @update:visible="hideErrorMsg">
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/attention.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description>
      <p class="heading-black-lg">
        {{ $t('errors.numberAlreadyInUse') }}
      </p>
      <p class="phone-in-use-error-description">
        {{
          $t('errors.numberInUseDetail', {
            numberPhone: formattedPhone,
          })
        }}
      </p>
    </template>
    <template #footer>
      <div class="popup-footer">
        <m-base-button class="btn mb-3" size="large" @click="goToLogin">
          {{ $t('auth.signup.welcomeAuth.loginWithThisNumber') }}
        </m-base-button>
        <m-base-button
          class="btn mb-3"
          size="large"
          view="secondary"
          @click="goBack"
        >
          {{ $t('auth.signup.welcomeAuth.goBack') }}
        </m-base-button>
      </div>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit!;

const emits = defineEmits(['next', 'close']);
const authStore = useAuthStore();

const dialCode = ref('');
const number = ref('');

onMounted(() => {
  dialCode.value = authStore.getLoginDialCode;
  number.value = authStore.getLoginSubscriberPhone;
});

const formattedPhone = computed(() => {
  const formattedPhone = `${number.value.slice(0, 3)} ${number.value.slice(
    3,
    6
  )} ${number.value.slice(6)}`;
  return `${dialCode.value} ${formattedPhone}`;
});

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

.popup-image {
  display: flex;
  justify-content: center;
  width: 100%;

  > .image {
    width: 50px;
    height: 50px;
  }
}
</style>
