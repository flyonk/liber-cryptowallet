<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="onPrev">
      {{ title }}
    </top-navigation>

    <p class="text-default">
      {{ text }}
    </p>

    <base-verification-code-input
      :value="verificationCode"
      :is-error="isError"
      @complete="onComplete"
    />

    <slot name="footer">
      <div v-if="props.withCountdown" class="footer">
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
  <base-toast :visible="isError" severity="error" @update:visible="onHide">
    <template #description>
      <div>
        {{ $t('configureApp.invalidCodeMessage') }}
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Clipboard } from '@capacitor/clipboard';
import { useErrorsStore } from '@/stores/errors';

import {
  TopNavigation,
  BaseButton,
  BaseVerificationCodeInput,
  BaseToast,
  BaseCountdown,
} from '@/components/ui';

const errorsStore = useErrorsStore();

const { tm } = useI18n();

const emit = defineEmits([
  'onComplete',
  'onResend',
  'onTimeIsUp',
  'onPrev',
  'onHide',
]);

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
  verificationCode: {
    type: String,
    default: '',
  },
});

const pasteFromClipboard = async () => {
  try {
    const content = await Clipboard.read();
    if (content.type === 'text/plain') {
      emit('onComplete', content.value);
    }
  } catch (err) {
    errorsStore.handle(
      err,
      'EnterVerificationCode',
      'pasteFromClipboard',
      tm('common.readFailure')
    );
  }
};

const onHide = (): void => {
  emit('onHide');
};

const onComplete = (value: string): void => {
  emit('onComplete', value);
};

const onResend = (): void => {
  emit('onResend');
};

const onTimeIsUp = (): void => {
  emit('onTimeIsUp');
};

const onPrev = (): void => {
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
