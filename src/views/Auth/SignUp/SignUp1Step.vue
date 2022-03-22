<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="prevStep">
      {{ $t('auth.signup.step1Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step1Description1') }}
      <br />
      {{ $t('auth.signup.step1Description2') }}
    </div>
    <div class="grid">
      <div class="col-4">
        <BaseCountryPhoneInput
          :dial-code="countryDialCode"
          @ready="handleSelectCountry"
          @selected="handleSelectCountry"
        />
      </div>
      <div class="col-8 ml-auto">
        <BaseInput
          v-model="number"
          :use-grouping="false"
          :type="type"
          :mask="mask"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
          <template v-if="isClearBtnShown" #append>
            <i
              class="ci-off_outline_close"
              @click="clearNumber"
              @touchend="clearNumber"
            />
          </template>
        </BaseInput>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        {{ $t('auth.signup.step1ExistingAcc') }}
        <router-link :to="{ name: Route.Login }" class="link">
          {{ $t('common.logInCta') }}
        </router-link>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton :disabled="isNumberInvalid" block @click="handleStep">
        {{ $t('common.signUpCta') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  TopNavigation,
  BaseCountryPhoneInput,
  BaseInput,
  BaseButton,
} from '@/components/ui';

import { ICountryInformation } from '@/types/country-phone-types';
import { Route } from '@/router/types';
import { computed } from '@vue/reactivity';

const router = useRouter();

const authStore = useAuthStore();

const emits = defineEmits(['next']);

const number = ref('');
const mask = ref('');
const countryDialCode = ref('');
const type = ref('');
const isClearBtnShown = ref(false);

const isNumberInvalid = computed(() => {
  if (!number.value) return true;
  return new RegExp(/_/).test(number.value);
});

onMounted(() => {
  const { phone, dialCode } = authStore.registration;

  if (phone) {
    number.value = authStore.login.phone;
  }

  if (!dialCode) {
    //TODO:Change to the default value taken from the smartphone
    authStore.registration.dialCode = '+7';
  }
  countryDialCode.value = authStore.registration.dialCode;
});

const handleSelectCountry = (data: ICountryInformation) => {
  const maskRegEx = new RegExp(/(\(|\)|#|-)*$/);

  // hack for reactive phone mask change
  type.value = '';
  setTimeout(() => {
    // set phone mask
    if (data.mask) {
      data.mask.replace(maskRegEx, function (match: string) {
        mask.value = match.replace(new RegExp(/^\)/), '');
        return match;
      });
      mask.value = mask.value.replaceAll('#', '9');
    } else {
      mask.value = '';
    }

    authStore.registration.dialCode = data.dialCode;
    type.value = data.mask ? 'mask' : 'number';
  }, 0);
};

const handleStep = () => {
  if (!number.value) return;
  authStore.registration.phone = String(number.value);
  emits('next');
};

const prevStep = () => {
  router.push({
    name: Route.WelcomeAuthScreen,
  });
};

const clearNumber = () => {
  number.value = '';
};

const showClearBtn = () => {
  isClearBtnShown.value = true;
};

const closeClearBtn = () => {
  isClearBtnShown.value = false;
};
</script>

<style lang="scss" scoped>
.footer {
  > span {
    color: $color-brand-2-300;

    > .link {
      color: $color-primary-500;
    }
  }
}
</style>
