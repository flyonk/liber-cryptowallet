<template>
  <div class="auth-page-container">
    <top-navigation>
      {{ $t('auth.restore.step5Title') }}
    </top-navigation>

    <base-input
      v-model="birthDate"
      type="mask"
      mask="99/99/9999"
      slot-char="DD/MM/YYYY"
      :placeholder="$t('auth.restore.step5Placeholder')"
      pattern="\d*"
      @focus="showClearBtn"
      @blur="closeClearBtn"
    >
      <template v-if="isClearBtnShown" #label>
        {{ $t('auth.restore.step5BirthLabel') }}
      </template>
      <template v-if="isClearBtnShown" #append>
        <i
          class="icon-transaction-small-reverted"
          @click="clearDate"
          @touchend="clearDate"
        />
      </template>
    </base-input>

    <!-- TODO: make separated component -->
    <div class="sign-button-wrapper">
      <BaseButton block :disabled="isDateInvalid" @click="$emit('next')">
        {{ $t('common.continueCta') }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TopNavigation, BaseInput, BaseButton } from '@/components/ui';
import { computed } from '@vue/reactivity';

const isClearBtnShown = ref(false);

defineEmits(['next', 'prev']);

const birthDate = ref('');

const isDateInvalid = computed(() => {
  if (!birthDate.value) return true;
  // eslint-disable-next-line
  const correct = new RegExp(
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  ).test(birthDate.value);
  return !correct;
});

const clearDate = () => {
  birthDate.value = '';
};

const showClearBtn = () => {
  isClearBtnShown.value = true;
};

const closeClearBtn = () => {
  isClearBtnShown.value = false;
};
</script>
