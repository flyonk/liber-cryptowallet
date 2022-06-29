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
        <p class="heading-dark-gray-md font-weight--semibold text">
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
      <base-button :disabled="!isCountrySelected" block @click="onSignUp">{{
        $t('views.kyc.kyc1step.signUpSecurely')
      }}</base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useKYCStore } from '@/stores/kyc';
import { useProfileStore } from '@/stores/profile';
import { ICountryInformation } from '@/types/country-phone-types';
import { Route } from '@/router/types';

import { BaseButton, TTopNavigation } from '@/components/ui';
import BaseCountrySelect from '@/components/ui/organisms/BaseCountrySelect.vue';

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
});

const setCountry = (selectedCountry: string): void => {
  kycStore.changeData('citizenship', selectedCountry);
};

const prevStep = async () => {
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

<style lang="scss" scoped>
.info {
  margin-bottom: 32px;
}
</style>
