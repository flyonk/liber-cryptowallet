<template>
  <div class="sign-up--container">
    <TopNavigation>
      Enter the 6-digit code
    </TopNavigation>
    <div class="sign-up--description text--body">
      To sign up, enter the security code
      <br>
      we’ve sent to ********6123
    </div>
    <div class="grid">
      <BaseVerificationCodeInput
        :loading="false"
        class="input"
      />
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        Resend code in 0:56
      </span>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseVerificationCodeInput from '@/components/UI/BaseVerificationCodeInput.vue';

import { StepDirection } from '@/views/Auth/SignUp/types';

export default defineComponent({
  name: 'SignUp',
  components: {
    TopNavigation,
    BaseVerificationCodeInput
  },
  emits: ['step'],
  setup() {
    const number = ref(null);

    return {
      number
    };
  },

  methods: {
    nextStep() {
      this.$emit('step', StepDirection.next);
    }
  }
});
</script>

<style scoped>

</style>
