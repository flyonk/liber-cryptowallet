<template>
  <!--TODO: move this component to atomic design templates (used in login flow and configure-app flow) -->
  <div class="page-wrapper">
    <!--TODO: move to molecule component-->
    <top-navigation @click:left-icon="onPrev">
      {{ title }}
    </top-navigation>

    <p class="text-default">
      {{ text }}
    </p>

    <base-verification-code-input
      v-model="verificationCode"
      @complete="onComplete"
    />

    <slot name="footer">
      <div class="footer" v-if="props.withCountdown">
        <span class="text--footnote font-weight--semibold">
          <BaseCountdown v-if="showCountdown" @time:up="onTimeIsUp">
            <template #countdown="{ minute, second }">
              {{ $t('auth.login.step2ResendTitle') }}
              {{ minute }}:{{ second }}
            </template>
          </BaseCountdown>
          <template v-else>
            <BaseButton
              class="resend-button"
              size="medium"
              view="flat"
              @click="onResend"
            >
              {{ $t('auth.login.step2ResendCta') }}
            </BaseButton>
          </template>
        </span>
      </div>
    </slot>
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block @click="pasteFromClipboard">
      {{ $t('common.pasteCta') }}
    </base-button>
  </div>
  <base-toast :visible="isError" severity="error">
    <template #description>
      <div>
        {{ $t('configureApp.invalidCodeMessage') }}
      </div>
    </template>
  </base-toast>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  TopNavigation,
  BaseButton,
  BaseVerificationCodeInput,
  BaseToast,
  BaseCountdown,
} from '@/components/ui';

const { tm } = useI18n();

const verificationCode = ref('');

const emit = defineEmits(['onComplete', 'onResend', 'onTimeIsUp', 'onPrev']);

const props = defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  withCountdown: {
    type: Boolean,
    default: false,
  },
  showCountdown: {
    type: Boolean,
    default: false,
  },
});

const pasteFromClipboard = () => {
  navigator.clipboard.readText().then(
    function (clipText) {
      verificationCode.value = clipText;
    },
    function (err) {
      console.error(`${tm('common.readFailure')} `, err);
    }
  );
};

const onComplete = (value) => {
  emit('onComplete', value);
};

const onResend = () => {
  emit('onResend');
};

const onTimeIsUp = () => {
  emit('onTimeIsUp');
};

const onPrev = () => {
  emit('onPrev');
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > .footer {
    > span {
      > .resend-button {
        padding: 0;
      }
    }
  }
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 20px;
}
</style>
