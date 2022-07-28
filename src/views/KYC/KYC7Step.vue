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
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
const { ABaseProgressCircular, MBaseButton } = uiKit as any;

const percent = ref(50);
const router = useRouter();
const pStore = useProfileStore();
const kycStore = useKYCStore();

const handleComplete = async () => {
  const { id: claimId } = kycStore.claimData as IClaim;
  kycStore.proceed(claimId);

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
