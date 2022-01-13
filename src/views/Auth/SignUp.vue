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
        >
          <template #label>
            Number
          </template>
        </BaseInput>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseCountryPhoneInput from '@/components/UI/BaseCountryPhoneInput.vue';

import { getFullList } from '@/services/country-phone';

export default defineComponent({
  name: 'SignUp',
  components: {
    TopNavigation,
    BaseInput,
    BaseCountryPhoneInput
  },
  setup() {
    const number = ref('');

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
}
</style>
