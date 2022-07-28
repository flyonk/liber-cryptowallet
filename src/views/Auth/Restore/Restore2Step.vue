<template>
  <template v-if="state === EState.pending">
    <div class="auth-page-container">
      <m-top-navigation @click:left-icon="$emit('prev')">
        {{ $t('auth.restore.step2Title') }}
      </m-top-navigation>
    </div>

    <base-passcode class="login-passcode" @submit="onSubmit" />

    <m-base-toast v-model:visible="showIncorrectPasswordToast" severity="error">
      <template #description>
        <div>
          {{ $t('auth.restore.step2Description') }}
        </div>
      </template>
    </m-base-toast>

    <m-base-toast v-model:visible="showSessionExpiredToast" severity="error">
      <template #description>
        <div class="session-expired-toast">
          <div>
            {{ $t('auth.restore.step2ExpiredTitle') }}
          </div>
          <div class="text--body">
            {{ $t('auth.restore.step2ExpiredDescription') }}
          </div>
          <m-base-button>
            {{ $t('common.retryCta') }}
          </m-base-button>
        </div>
      </template>
    </m-base-toast>
  </template>

  <template v-else-if="state === EState.success">
    <div class="auth-page-container">
      <m-top-navigation @click:left-icon="$emit('prev')">
        {{ $t('auth.restore.step2VerificationTitle') }}
      </m-top-navigation>

      <div class="description text--body">
        {{ $t('auth.restore.step2VerificationDescription') }}
      </div>

      <!-- TODO: make a reusable component -->
      <div class="notification-wrapper">
        <div class="description">
          <img
            src="@/assets/images/sapphire-attention.svg"
            alt="attention"
            class="image"
          />
          <div class="text text--body">
            <!-- TODO: change 06.12.2021 with real date -->
            {{ $t('auth.restore.step2Notification') }}
          </div>
        </div>
      </div>

      <div class="sign-button-wrapper">
        <m-base-button @click="$emit('next')">
          {{ $t('common.okCta') }}
        </m-base-button>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { inject, Ref, ref } from 'vue';

import { BasePasscode } from '@/components/ui';
import { EState } from '@/types/base-component';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
const { MBaseButton, MBaseToast, MTopNavigation } = uiKit as any;

const emit = defineEmits(['prev', 'next']);

const showIncorrectPasswordToast = ref(false);

const showSessionExpiredToast = ref(false);

const state = ref(EState.pending) as Ref<EState>;

const onSubmit = (success: boolean): void => {
  if (success) {
    emit('next');
  } else {
    showIncorrectPasswordToast.value = true;
  }
};
</script>

<style lang="scss" scoped>
.footer-wrapper {
  margin-top: 28px;
  text-align: center;
}

.session-expired-toast {
  > .text {
    color: $color-dark-grey;
    margin: 4px 0 16px;
  }
}

.notification-wrapper {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;

  > .description {
    padding: 120px 0 0;

    > .text {
      margin: 25px 0 0;
    }
  }

  > .footer {
    // margin: auto 0 0 0;
  }
}
</style>
