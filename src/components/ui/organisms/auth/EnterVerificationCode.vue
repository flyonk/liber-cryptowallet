<template>
  <div class="page-wrapper">
    <m-top-navigation :left-icon-name="leftIconName" @click:left-icon="onPrev">
      {{ title }}
    </m-top-navigation>

    <p class="text-default">
      <span>{{ text }}</span>
      <template v-if="showPasteBtn">
        <m-base-button
          class="resend-button"
          size="medium"
          view="flat"
          @click="pasteFromClipboard"
        >
          {{ $t('common.pasteCta') }}
        </m-base-button>
      </template>
    </p>

    <m-base-verification-code-input
      :value="verificationCode"
      :is-error="isError"
      @complete="onComplete"
      @change="onChange"
    />

    <slot name="footer">
      <div v-if="withCountdown" class="footer">
        <span class="text--footnote font-weight--semibold">
          <m-base-countdown v-if="showCountdown" @time:up="onTimeIsUp">
            <template #countdown="{ minute, second }">
              {{ $t('auth.login.step2ResendTitle') }}
              {{ minute }}:{{ second }}
            </template>
          </m-base-countdown>
          <template v-else>
            <m-base-button
              class="resend-button"
              size="medium"
              view="flat"
              @click="onResend"
            >
              {{ $t('auth.login.step2ResendCta') }}
            </m-base-button>
          </template>
        </span>
      </div>
    </slot>

    <slot name="additionalContent" />
  </div>
  <div style="padding: 15px; padding-bottom: 50px">
    <slot name="ctaBtn">
      <m-base-button block @click="pasteFromClipboard">
        {{ $t('common.pasteCta') }}
      </m-base-button>
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { Clipboard } from '@/helpers/clipboard/clipboard';

import { useErrorsStore } from '@/stores/errors';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const {
  MBaseButton,
  MBaseCountdown,
  MTopNavigation,
  MBaseVerificationCodeInput,
} = uiKit!;

const errorsStore = useErrorsStore();
const { t } = useI18n();
const emit = defineEmits([
  'onComplete',
  'onChange',
  'onResend',
  'onTimeIsUp',
  'onPrev',
  'onHide',
]);
defineProps({
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
  showPasteBtn: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  leftIconName: {
    type: String,
    default: 'icon-app-navigation-back',
  },
});

const pasteFromClipboard = async () => {
  try {
    const { value } = await Clipboard.read();

    emit('onComplete', value);
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    if (
      err.errorMessage &&
      err.errorMessage === 'There is no data on the clipboard'
    ) {
      return;
    }
    errorsStore.handle({
      err,
      name: 'EnterVerificationCode',
      ctx: 'pasteFromClipboard',
      description: t('common.pasteClipboardError'),
    });
  }
};

const onComplete = (value: string): void => {
  emit('onComplete', value);
};
const onChange = (value: string): void => {
  emit('onChange', value);
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
  margin: 10px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > .footer {
    margin-top: 23px;

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
  display: flex;
  justify-content: space-between;
  width: 100%;

  > :deep(.base-button .container) {
    justify-content: flex-end;
  }
}

:deep(.text--title-1) {
  font-weight: 600;
}
</style>
