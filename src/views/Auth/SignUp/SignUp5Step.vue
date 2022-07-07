<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('prev')">
    <template #title> {{ $t('auth.signup.step5Title') }}</template>
    <template #subtitle> {{ $t('auth.signup.step4Description') }}</template>
    <template #content
      ><div class="auth-page-container">
        <m-base-input
          v-model="birth"
          mask="99.99.9999"
          :placeholder="$t('auth.signup.ddmmyyyy')"
          pattern="\d*"
          type="mask"
          slot-char="dd.mm.yyyy"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template v-if="isClearBtnShown" #label>
            {{ $t('auth.signup.date') }}
          </template>
          <template v-if="isClearBtnShown" #append>
            <i
              class="icon-transaction-small-reverted"
              @click="clearDate"
              @touchend="clearDate"
            />
          </template>
        </m-base-input></div
    ></template>
    <template #fixed-footer>
      <m-base-button block :disabled="isDateInvalid" @click="nextStep">
        {{ $t('common.nextStep') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { MBaseInput, MBaseButton } from '@liber-biz/crpw-ui-kit-liber';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';
import { Route } from '@/router/types';
import { ref } from 'vue-demi';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useProfileStore } from '@/stores/profile';

const router = useRouter();
const pStore = useProfileStore();

const birth = ref('');

defineEmits(['next', 'prev']);

const isClearBtnShown = ref(false);

const isDateInvalid = computed(() => {
  if (!birth.value) return true;
  // eslint-disable-next-line
  const correct = new RegExp(
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  ).test(birth.value);
  return !correct;
});

const clearDate = () => {
  birth.value = '';
};

const showClearBtn = () => {
  isClearBtnShown.value = true;
};

const closeClearBtn = () => {
  isClearBtnShown.value = false;
};

const nextStep = () => {
  pStore.updateUserProfile({
    birthDate: birth.value,
  });
  router.push({
    name: Route.KYCMain,
  });
};
</script>
