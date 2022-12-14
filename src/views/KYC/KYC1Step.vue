<template>
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="prevStep"
  >
    <template #title>{{
      $t('views.kyc.kyc1step.countryOfResidence')
    }}</template>
    <template #subtitle>
      {{ $t('views.kyc.kyc1step.theTermsAnd') }}
    </template>
    <template #content>
      <base-country-select
        v-model="country"
        :preselected-data="pStore.getUser.country ? pStore.getUser.country : ''"
        :only-european="true"
        @update:model-value="setCountry"
      />
    </template>
    <template #fixed-footer>
      <div class="info">
        <p class="text--footnote color-light-gray font-weight--semibold text">
          {{ $t('views.kyc.kyc1step.byPressingSign') }}
          <a class="link" href="http://">{{
            $t('views.kyc.kyc1step.termsAmpConditions')
          }}</a>
          {{ $t('views.kyc.kyc1step.and') }}
          <a class="link" href="http://">
            {{ $t('views.kyc.kyc1step.privacyPolicy') }}
          </a>
        </p>
      </div>
      <m-base-button :disabled="!isCountrySelected" block @click="onSignUp">{{
        $t('views.kyc.kyc1step.signUpSecurely')
      }}</m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, Ref, inject } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { uiKitKey } from '@/types/symbols';

import { useKYCStore } from '@/stores/kyc';
import { useProfileStore } from '@/stores/profile';
import { ICountryInformation } from '@/types/country-phone-types';
import { Route } from '@/router/types';
import { IClaim } from '@/models/profile/claim';

import { TTopNavigation } from '@/components/ui';
import BaseCountrySelect from '@/components/ui/organisms/BaseCountrySelect.vue';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const router = useRouter();

const kycStore = useKYCStore();

const emit = defineEmits(['next']);

const country = ref('') as Ref<string | null>;

const isCountrySelected = computed(() => {
  return Boolean(country.value);
});

const pStore = useProfileStore();

const onSignUp = async () => {
  await pStore.updateUserProfile({
    country: (kycStore.getData.citizenship as ICountryInformation).name,
  });

  emit('next');
};

onBeforeMount(async () => {
  await pStore.init();
  if (!kycStore.getClaimData) {
    await kycStore.claim();
    if (
      (kycStore.getClaimData as unknown as IClaim).status > 10 &&
      (kycStore.getClaimData as unknown as IClaim).status < 30
    )
      router.push({
        name: Route.Survey,
      });
  }
});

const setCountry = (selectedCountry: string): void => {
  kycStore.changeData('citizenship', selectedCountry);
};

const routeProps = router.resolve({ name: Route.ProfilePhonesAndEmails });
const prevRouteIsProfile =
  routeProps.path === router.options.history?.state?.back;

const prevStep = async () => {
  if (!pStore.user.id) {
    await pStore.init();
  }
  if (prevRouteIsProfile) {
    router.push({
      name: Route.ProfilePhonesAndEmails,
    });
  } else if (pStore.user.is2FAConfigured) {
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

<style lang="scss" scoped>
.info {
  margin-bottom: 32px;
}
</style>
