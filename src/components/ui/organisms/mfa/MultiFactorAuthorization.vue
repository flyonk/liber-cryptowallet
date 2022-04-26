<template>
  <auth2-f-a-verification-component
    action-type="disable"
    @success-verification="handleSuccessVerification"
    @close="onClose"
  />
</template>

<script lang="ts" setup>
import { useMfaStore } from '@/stores/mfa';
import { useRouter } from 'vue-router';

import Auth2FAVerificationComponent from '@/components/ui/organisms/2fa/Auth2FAVerificationComponent.vue';

import { Route } from '@/router/types';

const router = useRouter();
const mfaStore = useMfaStore();

const handleSuccessVerification = () => {
  router.push({ name: Route.InstallApp });
};

const onClose = () => {
  mfaStore.hide();
};
</script>

<style lang="scss" scoped></style>
