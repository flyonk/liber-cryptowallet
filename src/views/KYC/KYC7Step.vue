<template>
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push({ name: Route.Survey })"
  >
    <template #title>{{
      $t('views.kyc.kyc7step.wereVerifyingYourId')
    }}</template>
    <template #subtitle>{{ $t('views.kyc.kyc7step.yourIdentityIs') }}</template>
    <template #content>
      <div>
        <a-base-progress-circular :percent="percent" :size="267">
          <span class="percent-slot">
            <span class="text">{{ percent }}</span>
            <span class="text--large-title">%</span>
          </span>
        </a-base-progress-circular>
      </div></template
    >
    <template #fixed-footer>
      <m-base-button block @click="handleComplete">
        {{ $t('views.kyc.kyc7step.continue') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { TTopNavigation } from '@/components/ui';
import { useProfileStore } from '@/stores/profile';
import { useKYCStore } from '@/stores/kyc';
import { useRouter } from 'vue-router';
import { Route } from '@/router/types';
import { IClaim } from '@/models/profile/claim';
import { uiKitKey } from '@/types/symbols';
import { useErrorsStore } from '@/stores/errors';
import { AxiosError } from 'axios';
import { SUPPORT_EMAIL } from '@/constants';
import { useI18n } from 'vue-i18n';

const uiKit = inject(uiKitKey);
const { ABaseProgressCircular, MBaseButton } = uiKit!;

const percent = ref(50);
const router = useRouter();
const pStore = useProfileStore();
const kycStore = useKYCStore();
const { tm } = useI18n();

const handleComplete = async () => {
  try {
    const { id: claimId } = kycStore.claimData as IClaim;
    await kycStore.proceed(claimId);

    if (!pStore.user.id) await pStore.init();
    if (pStore.user.is2FAConfigured) {
      router.push({
        name: Route.AuthPasscode,
      });
    } else {
      router.push({
        name: Route.Survey,
      });
    }
  } catch (e) {
    const errorsState = useErrorsStore();

    if ((e as AxiosError).response?.status === 409) {
      await errorsState.handle({
        err: e as AxiosError | Error,
        name: 'handleComplete',
        ctx: 'views/kyc7step',
        description: tm('views.kyc.kyc7step.documentError') as string,
      });

      router.push({
        name: Route.KYCMain,
        query: {
          step: 2,
        },
      });
    } else {
      await errorsState.handle({
        err: e as AxiosError | Error,
        name: 'handleComplete',
        ctx: 'views/kyc7step',
        description: `${tm(
          'views.kyc.kyc7step.errorMessage'
        )} ${SUPPORT_EMAIL}`,
      });
    }
  }
};
</script>

<style scoped lang="scss">
.percent-slot {
  > .text {
    font-weight: 700;
    font-size: 72px;
    line-height: 87.14px;
  }
}
</style>
