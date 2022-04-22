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
import { ref, PropType } from 'vue';

import { use2faStore } from '@/stores/2fa';

import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';

import { EActionTypes } from './types';

const store = use2faStore();

const props = defineProps({
  actionType: {
    type: String as PropType<EActionTypes>,
    default: EActionTypes.verify,
  },
});

const emit = defineEmits<{
  (event: 'success-verification'): void;
  (event: 'close'): void;
}>();

const verificationCode = ref('');
const isError = ref(false);

const onComplete = async (code: string) => {
  verificationCode.value = code;

  if (code.length === 6) {
    const result = await store[props.actionType](code);

    if (!result) {
      // there are not errors
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
