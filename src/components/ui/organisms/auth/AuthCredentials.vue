<template>
  <div class="auth-page-container">
    <top-navigation @click:left-icon="prevStep">
      {{ title }}
    </top-navigation>
    <div class="description text--body">
      {{ text }}
      <br />
      <template v-if="additionalText">
        {{ additionalText }}
      </template>
    </div>
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
        <base-input
          :key="updateKey"
          v-model="number"
          :use-grouping="false"
          :type="type"
          :mask="mask"
          :unmask="true"
          :auto-clear="false"
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
        </base-input>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <slot v-if="isInitialStep" name="footer-empty-state" />
        <slot v-else name="footer-valuable-state" />
      </span>
    </div>
    <div class="sign-button-wrapper">
      <base-button :disabled="isNumberInvalid" block @click="handleStep">
        {{ nextTitle }}
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { Ref, ref } from 'vue';

import { formatPhoneNumber } from '@/helpers/auth';
import {
  BaseButton,
  BaseCountryPhoneInput,
  BaseInput,
  TopNavigation,
} from '@/components/ui';

import { ICountryInformation } from '@/types/country-phone-types';
import { TypeBaseInput } from '@/components/ui/molecules/base-input/types';

const emits = defineEmits([
  'handleSelectCountry',
  'handleStep',
  'numberChange',
]);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
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

  // Need to update v-model in BaseInput -> PrimeVue InputMask -> mask
  forceUpdate();
};

const handleStep = () => {
  if (!number.value) return;

  const phone = formatPhoneNumber(number.value);

  emits('handleStep', phone);
};

const prevStep = () => {
  emits('onPrev');
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
.footer {
  > span {
    color: $color-brand-2-300;

    > :deep(.link) {
      color: $color-primary-500;
    }
  }
}
</style>
