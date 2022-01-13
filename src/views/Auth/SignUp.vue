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
      <BaseCountryPhoneInput class="col-3" />
      <BaseInput
        v-model="number"
        class="col-9"
      >
        <template #label>
          Number
        </template>
      </BaseInput>
    </div>
  </div>
</template>

<script lang="ts">
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
    BaseCountryPhoneInput,
  },
  setup () {
    const number = ref('')

    return {
      number
    }
  },
  created () {
    getFullList()
  }
});
</script>

<style lang="scss">
.sign-up--container {
  padding: 0 16px;

  .sign-up--description {
    padding-bottom: 24px;
  }
}
</style>
