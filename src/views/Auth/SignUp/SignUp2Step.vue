<template>
  <VerifyCode v-bind="$attrs" :flow="VerifyCodeFlow.Signup" @next="handle" />
  <phone-in-use
    v-if="phoneExist"
    :phone="number"
    :dial-code="dialCode"
    @next="continueWithExistedLogin"
    @close="onClose"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VerifyCode from '@/components/ui/organisms/auth/VerifyCode.vue';
import PhoneInUse from '@/components/ui/organisms/auth/PhoneInUse.vue';
import { VerifyCodeFlow } from '@/components/ui/organisms/auth/types';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Route } from '@/router/types';
import { use2faStore } from '@/stores/2fa';
import { clearAll } from '@/helpers/storage';

const router = useRouter();
const authStore = useAuthStore();
const twoFAStore = use2faStore();

const phoneExist = ref(false);
const number = ref('');
const dialCode = ref('');

defineEmits(['next']);

/**
 * the event appears when an existing number needs to be processed
 */
const handle = () => {
  number.value = authStore.registration.phone;
  dialCode.value = authStore.registration.dialCode;
  phoneExist.value = true;
};

const continueWithExistedLogin = async () => {
  authStore.setLoginPhone(authStore.getRegistrationPhone);

  await twoFAStore.set2FADate();
  authStore.setStep(2, 'login');

  await router.push({
    name: Route.Login,
  });
};
const onClose = () => {
  clearAll();

  phoneExist.value = false;
  router.push({ name: Route.SignUp });
  authStore.setStep(0, 'registration');
};
</script>

<style lang="scss">
// ...
</style>
