<template>
  <t-top-navigation @click:left-icon="mfaStore.hide">
    <template #title> Enter security codes </template>
    <template #content>
      <OInputConfirmationCode @complete="onEmailCodeComplete">
        <template #title>
          {{ emailText }}
        </template>
      </OInputConfirmationCode>

      <OInputConfirmationCode
        class="number-input-block"
        @complete="onNumberInputComplete"
      >
        <template #title>
          {{ numberText }}
        </template>
      </OInputConfirmationCode>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, Ref, ref } from 'vue';
import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';
import { useI18n } from 'vue-i18n';

import { OInputConfirmationCode, TTopNavigation } from '@/components/ui';

interface IFormInput {
  email: string;
  phone: string;
}

const emit = defineEmits(['completee']);

const mfaStore = useMfaStore();
const profileStore = useProfileStore();
const { tm } = useI18n();

const emailText = computed(
  () =>
    `${tm('auth.passcodeRestore.emailText')} ${
      profileStore.getUser.email || 'test@mail.com'
    }`
);

const form = ref({
  email: '',
  phone: '',
}) as Ref<IFormInput>;

const numberText = computed(
  () => `${tm('auth.passcodeRestore.numberText')} ${profileStore.getUser.phone}`
);

const onEmailCodeComplete = (data: string) => {
  startVerify('email', data);
};

const onNumberInputComplete = (data: string) => {
  startVerify('phone', data);
};

const startVerify = (key: keyof IFormInput, value: string) => {
  form.value[key] = value;

  if (form.value.email.length === 6 && form.value.phone.length === 6) {
    emit('complete', form.value);
  }
};
</script>

<style lang="scss" scoped>
.number-input-block {
  margin: 24px 0 0;
}
</style>
