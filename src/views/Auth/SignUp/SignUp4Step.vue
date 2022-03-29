<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="$emit('prev')">
      {{ $t('auth.signup.step4Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.signup.step4Description1') }}
      <br />
      {{ $t('auth.signup.step4Description2') }}
    </div>
    <base-input
      v-model="firstname"
      @focus="showClearFirstNameBtn"
      @blur="closeClearFirstNameBtn"
    >
      <template #label>
        {{ $t('common.firstName') }}
      </template>
      <template v-if="isClearFirstNameBtnShown" #append>
        <i
          class="ci-off_outline_close"
          @click="clearFirstName"
          @touchend="clearFirstName"
        />
      </template>
    </base-input>
    <base-input
      v-model="lastname"
      @focus="showClearLastNameBtn"
      @blur="closeClearLastNameBtn"
    >
      <template #label>
        {{ $t('common.lastName') }}
      </template>
      <template v-if="isClearLastNameBtnShown" #append>
        <i
          class="ci-off_outline_close"
          @click="clearLastName"
          @touchend="clearLastName"
        />
      </template>
    </base-input>
    <div class="sign-button-wrapper">
      <BaseButton block :disabled="isFullNameInvalid" @click="nextStep">
        {{ $t('common.nextStep') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi';

import { TopNavigation, BaseButton, BaseInput } from '@/components/ui';
import { computed } from '@vue/reactivity';

import { useProfileStore } from '@/stores/profile';

const pStore = useProfileStore();

const emit = defineEmits(['next', 'prev']);

const firstname = ref('');
const lastname = ref('');
const isClearFirstNameBtnShown = ref(false);
const isClearLastNameBtnShown = ref(false);

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
</script>
