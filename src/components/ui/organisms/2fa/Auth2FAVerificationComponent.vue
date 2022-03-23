<template name="Auth2FAVerificationComponent">
  <EnterVerificationCode
    :is-error="isError"
    :text="$t('auth.login.step4Description')"
    :title="$t('auth.login.step4Title')"
    @on-hide="onHideError"
    @on-complete="onComplete"
    @on-prev="onPrevStep"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const emit = defineEmits<{
  (event: 'convert-funds'): void;
  (event: 'close'): void;
}>();

const verificationCode = ref('');
const isError = ref(false);

// const router = useRouter();

const onComplete = async (code: string) => {
  verificationCode.value = code;

  // @TODO
  // Remove later
  if (code === '000000') {
    emit('convert-funds');
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
