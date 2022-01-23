<template>
  <div class="sign-up--container">
    <TopNavigation> Enter phone number </TopNavigation>
    <div class="sign-up--description text--body">
      We will send verification code
      <br />
      to this number.
    </div>
    <div class="grid">
      <div class="col-4">
        <BaseCountryPhoneInput />
      </div>
      <div class="col-8 ml-auto">
        <BaseInput v-model="number" :use-grouping="false" type="number">
          <template #label> Number </template>
        </BaseInput>
      </div>
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        Already have an account?
        <span class="link"> Log in </span>
      </span>
    </div>
    <div class="sign-button-wrapper">
      <BaseButton block @click="nextStep"> Sign up </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import TopNavigation from '@/components/UI/TopNavigation.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseCountryPhoneInput from '@/components/UI/BaseCountryPhoneInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

import { StepDirection } from '@/views/Auth/SignUp/types';

// export default defineComponent({
//   name: "SignUp",
//   components: {
//     TopNavigation,
//     BaseInput,
//     BaseCountryPhoneInput,
//     BaseButton,
//   },
//   emits: ["step"],
//   setup() {
//     const number = ref(null);

//     return {
//       number,
//     };
//   },

//   methods: {
//     nextStep() {
//       this.$emit("step", StepDirection.next);
//     },
//   },
// });

const number = ref(null);

const emit = defineEmits(['step']);

function nextStep(): void {
  emit('step', StepDirection.next);
}
</script>

<style scoped></style>
