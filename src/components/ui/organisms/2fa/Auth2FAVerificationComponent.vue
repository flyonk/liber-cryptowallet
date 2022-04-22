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

import { use2faStore } from '@/stores/2fa';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

const store = use2faStore();

const emit = defineEmits<{
  (event: 'success-verification'): void;
  (event: 'close'): void;
}>();

store.init().then(() => {
  store.generateToken();
});

const verificationCode = ref('');
const isError = ref(false);

const onComplete = async (code: string) => {
  verificationCode.value = code;

  if (code.length === 6) {
    const result = await store.verify(code);
    if (result?.delta === 0) {
      emit('success-verification');
    } else {
      isError.value = true;
    }
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
