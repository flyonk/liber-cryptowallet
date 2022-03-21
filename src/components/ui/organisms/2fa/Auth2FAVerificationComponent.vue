<template name="Auth2FAVerificationComponent">
  <EnterVerificationCode
    :title="$t('auth.login.step4Title')"
    :text="$t('auth.login.step4Description')"
    :is-error="isError"
    @onHide="onHideError"
    @onComplete="onComplete"
    @onPrev="onPrevStep"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const emit = defineEmits<{
  (event: 'success-verification'): void;
  (event: 'close'): void;
}>();

const verificationCode = ref('');
const isError = ref(false);

const onComplete = async (code: string) => {
  verificationCode.value = code;

  // @TODO
  // Remove later
  if (code === '000000') {
    emit('success-verification');
  } else {
    isError.value = true;
  }
};

const onHideError = () => {
  isError.value = false;
};

const onPrevStep = (): void => {
  emit('close');
};
</script>

<style lang="scss" scoped>
// ...
</style>
