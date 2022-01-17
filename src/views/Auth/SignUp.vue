<template>
  <div class="sign-up--container">
    <TopNavigation>
      Enter phone number
    </TopNavigation>
    <div class="sign-up--description text--body">
      We will send verification code
      <br>
      to this number.
    </div>
    <div class="grid">
      <div class="col-4">
        <BaseCountryPhoneInput />
      </div>
      <div class="col-8 ml-auto">
        <BaseInput
          v-model="number"
          :use-grouping="false"
          type="number"
        >
          <template #label>
            Number
          </template>
        </BaseInput>
      </div>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton
        block
      >
        Sign up
      </BaseButton>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseCountryPhoneInput from '@/components/UI/BaseCountryPhoneInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

import { getFullList } from '@/services/country-phone';

export default defineComponent({
  name: 'SignUp',
  components: {
    TopNavigation,
    BaseInput,
    BaseCountryPhoneInput,
    BaseButton
  },
  setup() {
    const number = ref(null);

    return {
      number
    };
  },
  created() {
    getFullList();
  }
});
</script>

<style lang='scss'>
.sign-up--container {
  padding: 0 16px;

  .sign-up--description {
    padding-bottom: 24px;
  }

  .sign-button-wrapper {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }
}
</style>
