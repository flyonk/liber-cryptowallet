<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="$emit('prev')">
      {{ $t('auth.signup.step5Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step4Description1') }}
      <br />
      {{ $t('auth.signup.step4Description2') }}
    </div>
    <base-input
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
          class="ci-off_outline_close"
          @click="clearDate"
          @touchend="clearDate"
        />
      </template>
    </base-input>
    <!-- TODO: move to a separated component -->
    <div class="sign-button-wrapper">
      <BaseButton block :disabled="isDateInvalid" @click="nextStep">
        {{ $t('common.nextStep') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseButton, BaseInput } from '@/components/ui';
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
