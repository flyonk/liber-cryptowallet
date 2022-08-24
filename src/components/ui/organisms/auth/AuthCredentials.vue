<template>
  <div class="auth-page-container">
    <h1 class="title">{{ title }}</h1>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input
          :dial-code="countryDialCode"
          :only-european="true"
          @ready="handleSelectCountry"
          @selected="handleSelectCountry"
        />
      </div>
      <div class="col-8 ml-auto">
        <!-- TODO:need to use type variable -->
        <m-base-input
          :key="updateKey"
          v-model="number"
          class="m-base-input"
          :use-grouping="false"
          :type="type"
          :mask="mask"
          :unmask="true"
          :auto-clear="false"
          inputmode="tel"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label> {{ $t('common.numberLabel') }}s </template>
          <template v-if="isClearBtnShown" #actions>
            <img
              class="icon"
              :src="`${STATIC_BASE_URL}/static/menu/circle_close.svg`"
              @click.prevent="clearNumber"
              @touchend.prevent="clearNumber"
            />
          </template>
        </m-base-input>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <slot v-if="isInitialStep" name="footer-empty-state" />
        <slot v-else name="footer-valuable-state" />
      </span>
    </div>
    <div class="sign-button-wrapper">
      <m-base-button :disabled="isNumberInvalid" block @click="handleStep">
        {{ nextTitle }}
      </m-base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { Ref, ref, inject } from 'vue';

import { formatPhoneNumber } from '@/helpers/auth';
import { BaseCountryPhoneInput } from '@/components/ui';

import { ICountryInformation } from '@/types/country-phone-types';
import { TypeBaseInput } from '@/components/ui/molecules/base-input/types';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseInput, MBaseButton } = uiKit!;

const emits = defineEmits([
  'handleSelectCountry',
  'handleStep',
  'numberChange',
  'onPrev',
]);

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  additionalText: {
    type: String,
    default: '',
  },
  nextTitle: {
    type: String,
    default: '',
  },
  countryDialCode: {
    type: String,
    default: '',
  },
  initialNumber: {
    type: String,
    default: '',
  },
});

const mask = ref('');
const updateKey = ref(0);
const type = ref(TypeBaseInput.Mask) as Ref<TypeBaseInput>;
const isClearBtnShown = ref(false);
const number: Ref<string | null> = ref(props.initialNumber);

const isInitialStep = ref(true) as Ref<boolean>;

const isNumberInvalid = computed(() => {
  if (!number.value) return true;
  /**
   * Check the number of '9' in the mask,
   * if the length of the entered number is less,
   * then the button is disabled
   */
  const numOfDigits = mask.value.replace(new RegExp(/\D/, 'g'), '').length;
  if (number.value.length < numOfDigits) return true;

  /**
   * For the only country from the list of European countries without a mask (UK),
   * the limit is 10 digits
   */
  if (props.countryDialCode === '+44' && (number.value + '').length !== 10)
    return true;

  return new RegExp(/_/).test(number.value);
});

const handleSelectCountry = (data: ICountryInformation) => {
  const maskRegEx = new RegExp(/(\(|\)|#|-)*$/);

  type.value = TypeBaseInput.Number;
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

  emits('handleSelectCountry', data.dialCode);
  type.value = data.mask ? TypeBaseInput.Mask : TypeBaseInput.Number;

  /**
   * in order to avoid the appearance of '0'
   * when changing the m-base-input type to "number" from 'mask'
   * with the value ""
   * */
  if (type.value === TypeBaseInput.Number && number.value === '') {
    number.value = null;
  }

  // Need to update v-model in BaseInput -> PrimeVue InputMask -> mask
  forceUpdate();
};

const handleStep = () => {
  if (!number.value) return;

  const phone = formatPhoneNumber(number.value + '');

  emits('handleStep', phone);
};

const clearNumber = () => {
  number.value = null;
};

const showClearBtn = () => {
  isClearBtnShown.value = true;
  isInitialStep.value = false;
};

const closeClearBtn = () => {
  isClearBtnShown.value = false;
};

const forceUpdate = () => {
  updateKey.value++;
};
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}

.auth-page-container {
  > .title {
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    color: $color-black;
  }

  > .footer {
    > span {
      color: $color-brand-2-300;

      > :deep(.link) {
        color: $color-primary-500;
      }
    }
  }
}
</style>
