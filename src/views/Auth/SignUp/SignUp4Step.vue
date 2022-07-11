<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('prev')">
    <template #title> {{ $t('auth.signup.step4Title') }}</template>
    <template #subtitle>
      {{ $t('auth.signup.step4Description') }}
    </template>
    <template #content>
      <div class="auth-page-container">
        <m-base-input
          v-model="firstname"
          class="m-base-input"
          @focus="showClearFirstNameBtn"
          @blur="closeClearFirstNameBtn"
          @input.stop="firstNamePreventExtraCharacters"
        >
          <template #label>
            {{ $t('common.firstName') }}
          </template>
          <template v-if="isClearFirstNameBtnShown" #append>
            <i
              class="icon-transaction-small-reverted"
              @click="clearFirstName"
              @touchend="clearFirstName"
            />
          </template>
        </m-base-input>
        <m-base-input
          v-model="lastname"
          class="m-base-input"
          @focus="showClearLastNameBtn"
          @blur="closeClearLastNameBtn"
          @input.stop="lastNamePreventExtraCharacters"
        >
          <template #label>
            {{ $t('common.lastName') }}
          </template>
          <template v-if="isClearLastNameBtnShown" #append>
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
import { ref } from 'vue-demi';

import { MBaseInput, MBaseButton } from '@liber-biz/crpw-ui-kit-liber';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';
import { computed } from '@vue/reactivity';
import { useProfileStore } from '@/stores/profile';

const pStore = useProfileStore();

const emit = defineEmits(['next', 'prev']);

const firstname = ref('');
const lastname = ref('');
const isClearFirstNameBtnShown = ref(false);
const isClearLastNameBtnShown = ref(false);
const preventNumbersRegExp = new RegExp(/([\d*])/, 'g');

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

const firstNamePreventExtraCharacters = (event: Event) => {
  /**
   * Trim for remove the problem after inserting a hint from the iphone keyboard.
   * This insert adds the ' ' character to the field
   */
  if (firstname.value === ' ') {
    firstname.value = firstname.value.replace(/\s/, '');
  }

  firstname.value = firstname.value.replaceAll(preventNumbersRegExp, '');

  const target = event.target as HTMLInputElement;
  target.value = firstname.value;
};

const lastNamePreventExtraCharacters = (event: Event) => {
  /**
   * /\s/ for remove the problem after inserting a hint from the iphone keyboard.
   * This insert adds the ' ' character to the field
   */
  if (lastname.value === ' ') {
    lastname.value = lastname.value.replace(/\s/, '');
  }

  lastname.value = lastname.value.replaceAll(preventNumbersRegExp, '');

  const target = event.target as HTMLInputElement;
  target.value = lastname.value;
};
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}
</style>
