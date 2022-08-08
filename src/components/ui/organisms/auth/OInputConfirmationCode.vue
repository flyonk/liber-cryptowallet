<template>
  <div>
    <p class="text-default">
      <slot name="title"></slot>
    </p>
    <m-base-verification-code-input
      :value="code"
      @complete="onComplete"
      @change="onChange"
    />
    <div class="footer">
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
            @click="onResendCode"
          >
            {{ $t('auth.login.step2ResendCta') }}
          </m-base-button>
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { UiKitInterface } from '@/types/uiKit';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);

const {
  MBaseButton,
  MBaseCountdown,
  // MTopNavigation,
  MBaseVerificationCodeInput,
} = uiKit as UiKitInterface;

const emit = defineEmits(['complete', 'change', 'resend']);

const code = ref('');
const showCountdown = ref(true);

const onComplete = (value: string) => {
  emit('complete', value);
};

const onChange = (value: string) => {
  code.value = value;
};

const onResendCode = () => {
  emit('resend');

  showCountdown.value = true;
};

const onTimeIsUp = () => {
  showCountdown.value = false;
};
</script>

<style scoped lang="scss">
.text-default {
  margin: 0 0 24px;
}
</style>
