<template>
  <template v-if="state === EState.pending">
    <div class="auth-page-container">
      <top-navigation @click:left-icon="$emit('prev')">
        Enter passcode
      </top-navigation>
    </div>
  
    <base-passcode
      class="login-passcode"
      @submit="onSubmit"
    />

    <base-toast
      v-model:visible="showIncorrectPasswordToast"
      severity="error"
    >
      <template #description>
        <div>
          The passcode or phone number you entered is incorrect
        </div>
      </template>
    </base-toast>
    <base-toast
      v-model:visible="showSessionExpiredToast"
      severity="error"
    >
      <template #description>
        <div class="session-expired-toast">
          <div>
            Session expired
          </div>
          <div class="text--body">
            Try to restore access again
          </div>
          <base-button>
            To retry
          </base-button>
        </div>
      </template>
    </base-toast>
  </template>

  <template v-else-if="state === EState.success">
    <div class="auth-page-container">
      <top-navigation @click:left-icon="$emit('prev')">
        We're verifying your account
      </top-navigation>
      
      <div class="description text--body">
        We just need to perform a coupe of security checks to recover your account.
      </div>

      <div class="notification-wrapper">
        <div class="description">
          <img
            src="@/assets/images/sapphire-attention.svg"
            alt="attention"
            class="image"
          >
          <div class="text text--body">
            Please check back on this device after 06.12.2021
          </div>
        </div>
      </div>

      <div class="sign-button-wrapper">
        <base-button @click="$emit('next')">
          Got it
        </base-button>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

import { TopNavigation, BaseToast, BasePasscode, BaseButton } from '@/components/UI';
import { EState } from '@/types/base-component';

const emit = defineEmits(['prev', 'next'])

const showIncorrectPasswordToast = ref(false)

const showSessionExpiredToast = ref(false)

const state = ref(EState.pending) as Ref<EState>;

const onSubmit = (): void => {
  emit('next');
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  margin-top: 28px;
  text-align: center;
}

.session-expired-toast {
  .text--body {
    color: $color-dark-grey;
    margin: 4px 0 16px 0;
  }
}

.notification-wrapper {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  > .description {
    padding: 120px 0 0 0;

    > .text {
      margin: 25px 0 0 0;
    }
  }

  > .footer {
    // margin: auto 0 0 0;
  }
}
</style>