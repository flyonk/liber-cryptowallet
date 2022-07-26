<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('prev')">
    <template #title> {{ $t('auth.signup.step4Title') }}</template>
    <template #subtitle>
      {{ $t('auth.signup.step4Description') }}
    </template>
    <template #content>
      <div class="auth-page-container">
        <m-base-input
          :model-value="firstname"
          @focus="showClearFirstNameBtn"
          @blur="closeClearFirstNameBtn"
          @update:modelValue="firstNamePreventExtraCharacters"
        >
          <template #label>
            {{ $t('common.firstName') }}
          </template>
          <template v-if="isClearFirstNameBtnShown" #actions>
            <i
              class="icon-transaction-small-reverted"
              @click="clearFirstName"
              @touchend="clearFirstName"
            />
          </template>
        </m-base-input>
        <m-base-input
          :model-value="lastname"
          class="m-base-input"
          @focus="showClearLastNameBtn"
          @blur="closeClearLastNameBtn"
          @update:modelValue="lastNamePreventExtraCharacters"
        >
          <template #label>
            {{ $t('common.lastName') }}
          </template>
          <template v-if="isClearLastNameBtnShown" #actions>
            <i
              class="icon-transaction-small-reverted"
              @click="clearLastName"
              @touchend="clearLastName"
            />
          </template>
        </m-base-input></div
    ></template>
    <template #fixed-footer>
      <m-base-button block :disabled="isFullNameInvalid" @click="nextStep">
        {{ $t('common.nextStep') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { ref } from 'vue-demi';

import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';
import { computed } from '@vue/reactivity';
import { useProfileStore } from '@/stores/profile';

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const pStore = useProfileStore();

const emit = defineEmits(['next', 'prev']);

const firstname = ref('');
const lastname = ref('');
const isClearFirstNameBtnShown = ref(false);
const isClearLastNameBtnShown = ref(false);
const preventNumbersRegExp = new RegExp(/([\d])/, 'g');

const isFullNameInvalid = computed(() => {
  return !firstname.value || !lastname.value;
});

const clearFirstName = () => {
  firstname.value = '';
};

const showClearFirstNameBtn = () => {
  isClearFirstNameBtnShown.value = true;
};

const closeClearFirstNameBtn = () => {
  isClearFirstNameBtnShown.value = false;
};

const clearLastName = () => {
  lastname.value = '';
};

const showClearLastNameBtn = () => {
  isClearLastNameBtnShown.value = true;
};

const closeClearLastNameBtn = () => {
  isClearLastNameBtnShown.value = false;
};

const nextStep = () => {
  pStore.updateUserProfile({
    firstName: firstname.value,
    lastName: lastname.value,
  });
  emit('next');
};

const firstNamePreventExtraCharacters = (value: string) => {
  /**
   * Trim for remove the problem after inserting a hint from the iphone keyboard.
   * This insert adds the ' ' character to the field
   */
  let valueToSet = value;
  if (valueToSet === ' ') {
    valueToSet = valueToSet.replace(/\s*/, '');
  }
  firstname.value = value;
  setTimeout(() => {
    firstname.value = valueToSet.replaceAll(preventNumbersRegExp, '');
  }, 0);
};

const lastNamePreventExtraCharacters = (value: string) => {
  /**
   * /\s/ for remove the problem after inserting a hint from the iphone keyboard.
   * This insert adds the ' ' character to the field
   */
  let valueToSet = value;
  if (valueToSet === ' ') {
    valueToSet = valueToSet.replace(/\s*/, '');
  }
  lastname.value = value;

  setTimeout(() => {
    lastname.value = valueToSet.replaceAll(preventNumbersRegExp, '');
  }, 0);
};
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}

.auth-page-container {
  > .base-input:deep {
    margin-bottom: 16px;
  }
}
</style>
