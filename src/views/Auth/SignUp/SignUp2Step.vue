<template>
  <div class="sign-up--container">
    <TopNavigation @click:left-icon="$emit('step', prevStep)">
      Enter the 6-digit code
    </TopNavigation>
    <div class="sign-up--description text--body">
      To sign up, enter the security code
      <br />
      we’ve sent to ********6123
    </div>
    <div class="grid">
      <BaseVerificationCodeInput :loading="false" class="input" />
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <BaseCountdown v-if="showCountdown" @time:up="onTimeIsUp">
          <template #countdown="{ minute, second }">
            Resend code in {{ minute }}:{{ second }}
          </template>
        </BaseCountdown>
        <template v-else>
          <BaseButton class="resend-button" size="medium" view="flat">
            Resend
          </BaseButton>
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import {
  BaseButton,
  BaseCountdown,
  BaseVerificationCodeInput,
  TopNavigation,
} from '@/components/UI';

import { StepDirection } from '@/views/Auth/SignUp/types';

export default defineComponent({
  name: 'SignUp',
  components: {
    TopNavigation,
    BaseVerificationCodeInput,
    BaseCountdown,
    BaseButton,
  },
  emits: ['step'],

  setup() {
    const number = ref(null) as Ref<number | null>;
    const showCountdown = ref(true) as Ref<boolean>;

    return {
      number,
      showCountdown,
    };
  },

  methods: {
    nextStep(): void {
      this.$emit('step', StepDirection.next);
    },

    prevStep(): void {
      this.$emit('step', StepDirection.prev);
    },

    onTimeIsUp(): void {
      this.showCountdown = false;
    },
  },
});
</script>

<style lang="scss">
.footer {
  .resend-button {
    padding: 0;
  }
}
</style>
