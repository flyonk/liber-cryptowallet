<template>
  <enter-verification-code
    :title="$t('auth.signup.confirmEmail.title')"
    :text="text"
    :is-error="errorCode"
    @on-hide="onHideError"
    @on-complete="confirmEmail"
    @on-prev="onPrevStep"
  >
    <template #ctaBtn>
      <button class="resend" @click="resendCode">
        {{ $t('auth.signup.confirmEmail.resendCode') }}
      </button></template
    >
  </enter-verification-code>
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from 'vue';
import EnterVerificationCode from '@/components/ui/organisms/auth/EnterVerificationCode.vue';
import { useProfileStore } from '@/stores/profile';
import { useI18n } from 'vue-i18n';
import { useErrorsStore } from '@/stores/errors';

const { tm } = useI18n();
const emit = defineEmits(['prev', 'next']);
const pStore = useProfileStore();
const errorsStore = useErrorsStore();

const text = computed(
  () => `${tm('auth.signup.confirmEmail.text')} ${pStore.user.email}`
);

let errorCode = ref(false) as Ref<boolean>;

const onHideError = () => {
  errorCode.value = false;
};

const confirmEmail = (otp: string) => {
  pStore.confirmEmail(otp).then(
    () => {
      emit('next');
    },
    (err) => {
      errorCode.value = true;

      errorsStore.handle({
        err,
        name: 'ConfigureAppVuetify',
        ctx: 'onComplete',
        description: tm('errors.confrimVerificationCode'),
      });
    }
  );
};

const resendCode = () => {
  pStore.sendEmail();
};

const onPrevStep = (): void => {
  emit('prev');
};
</script>

<style lang="scss" scoped>
.resend {
  background: none;
  color: $color-primary;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
}
</style>
